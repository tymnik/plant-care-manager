import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';

const sharp = require('sharp');
@Injectable()
export class SharpService {
  constructor() {}
  public async resizeOne(
    file: Express.Multer.File,
    width: number,
    height: number,
  ): Promise<Buffer> {
    return await sharp(file.buffer)
      .resize(width, height, { fit: 'inside' })
      .toFormat(extname(file.originalname).replace('.', ''))
      .toBuffer();
  }
  public async resizeMany(
    file: Express.Multer.File,
    scales: { width: number; height: number }[],
  ): Promise<Buffer[]> {
    return await Promise.all(
      scales.map(async ({ width, height }) => {
        return await this.resizeOne(file, width, height);
      }),
    );
  }
}
