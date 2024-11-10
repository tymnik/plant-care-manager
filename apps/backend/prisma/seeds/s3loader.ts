import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { faker } from '@faker-js/faker';
import { SharpService } from '../../src/file/sharp.service';
const sharp = require('sharp');
var mimeDb = require('mime-db');
const bucketName = 'public';
const axios = require('axios');
const client = new S3Client({
  endpoint: 'http://localhost:9000',
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  forcePathStyle: true,
});
function getFileUrlByKey(filename: string) {
  return `http://localhost:9000/${bucketName}/${filename}`;
}
async function upload(buffer: Buffer, key: string, mimetype) {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: mimetype,
  });
  try {
    await client.send(command);
    const filename = await getFileUrlByKey(key);
    return filename;
  } catch (err) {
    console.error(err);
    throw new Error("Can't save file from storage");
  }
}
async function uploadResizedArray(
  buffer: Buffer,
  resizedImgBuffers: { [key: string]: Buffer }[],
  folder,
  mimetype,
) {
  return (
    await Promise.all([
      {
        original: await upload(buffer, `${folder}/original.png`, mimetype),
      },
      ...resizedImgBuffers.map(async (obj) => {
        for (const [key, buffer] of Object.entries(obj)) {
          const res = {
            [`${key}`]: await upload(
              buffer,
              `${folder}/${key}.${'png'}`,
              mimetype,
            ),
          };

          return await res;
        }
      }),
    ])
  ).reduce((acc, cur) => {
    return { ...acc, ...cur };
  }, {});
}
export async function uploadFakeImagesAndReturnScales(plantId: string) {
  const folder = `admin/uploads/plant/${plantId}`;
  const scales = [
    { width: 160, height: 160 },
    { width: 240, height: 240 },
    { width: 300, height: 300 },
  ];
  const res = await axios.get(faker.image.url({ width: 600, height: 600 }), {
    responseType: 'arraybuffer',
  });
  const buffer = Buffer.from(res.data, 'binary');
  const mimetype = res.headers['content-type'];
  const resizedImgBuffers = await resizeManyAndReturnBuffers(res.data, scales);
  const sizes = await uploadResizedArray(
    buffer,
    resizedImgBuffers,
    folder,
    mimetype,
  );
  return sizes;
}

async function resizeOne(
  buffer: Buffer,
  width: number,
  height: number,
): Promise<Buffer> {
  return await sharp(buffer)
    .resize(width, height, { fit: 'inside' })
    .toFormat('png')
    .toBuffer();
}
async function resizeManyAndReturnBuffers(
  buffer: Buffer,
  scales: { width: number; height: number }[],
): Promise<Record<string, Buffer>[]> {
  const resizedImgBuffers = await Promise.all(
    scales.map(async ({ width, height }) => ({
      [`${width}x${height}`]: await resizeOne(buffer, width, height),
    })),
  );
  return resizedImgBuffers;
}
