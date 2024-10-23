import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {
  BadGatewayException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { File } from '@plant-care/types';
import { extname } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasePrismaCrudService } from 'src/shared/classes/BasePrismaCrudService';
import { S3Service } from './s3.service';
import { SharpService } from './sharp.service';
import { he } from '@faker-js/faker/.';

const sharp = require('sharp');
@Injectable()
export class FileService extends BasePrismaCrudService<
  File,
  File.Args.Create,
  File.Args.FindMany,
  File.Args.FindOne,
  File.Args.Delete,
  File.Args.Update
> {
  constructor(
    protected prisma: PrismaService,
    @Inject(forwardRef(() => S3Service))
    private readonly s3Service: S3Service,
    @Inject(forwardRef(() => SharpService))
    private readonly sharpService: SharpService,
  ) {
    super(prisma, 'file');
  }
  async uploadPlantPhoto(file: Express.Multer.File, plantId: string) {
    const folder = `admin/uploads/plant/${plantId}/${this.createUniqueName()}`;
    const scales = [
      { width: 200, height: 200 },
      { width: 400, height: 400 },
      { width: 800, height: 800 },
      { width: 1024, height: 1024 },
      { width: 1280, height: 720 }, // 720p
      { width: 1920, height: 1080 }, // 1080p
    ];
    const resizedImgBuffers = await Promise.all(
      scales.map(async ({ width, height }) => ({
        [`${width}x${height}`]: await this.sharpService.resizeOne(
          file,
          width,
          height,
        ),
      })),
    );
    const sizes = (
      await Promise.all([
        {
          original: await this.s3Service.upload(
            file.buffer,
            `${folder}/original`,
            file.mimetype,
          ),
        },
        ...resizedImgBuffers.map(async (obj) => {
          for (const [key, buffer] of Object.entries(obj)) {
            return {
              [`${key}`]: await this.s3Service.upload(
                buffer,
                `admin/uploads/plant/${plantId}/${key}`,
                file.mimetype,
              ),
            };
          }
        }),
      ])
    ).reduce((acc, cur) => ({ ...acc, ...cur }), {});
    return await super.create({
      name: file.filename,
      path: folder,
      original: sizes['original'],
      scales: sizes,
      isAdminContent: true,
    });
  }
  private createUniqueName(): string {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    return `${uniqueSuffix}`;
  }
  async uploadFile(file: Express.Multer.File) {
    const scaledUrls = await this.uploadPlantPhoto(file, 'dsadsad');
    // super.create({
    //   original: scaledUrls[0],
    // });
  }
}
