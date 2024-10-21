import { BadGatewayException, Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';
@Injectable()
export class FileService {
  client: S3Client;
  bucketName: string;
  constructor(private readonly configService: ConfigService) {
    this.client = new S3Client({
      endpoint:
        configService.get('NODE_ENV') === 'development' &&
        'http://localhost:9000',
      region: configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
      forcePathStyle: true,
    });
  }
  createUniqueName(ext: string): string {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    return `${uniqueSuffix}${ext}`;
  }
  getFileUrlByName(filename: string) {
    return this.configService.get('NODE_ENV') === 'development'
      ? `http://localhost:9000/${this.bucketName}/${filename}`
      : `https://${this.bucketName}.${this.configService.get<string>('AWS_REGION')}.s3.amazonaws.com/${filename}`;
  }
  async uploadFile(file: Express.Multer.File) {
    const ext = extname(file.originalname);
    const filename = this.createUniqueName(ext);
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: filename,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    try {
      await this.client.send(command);
    } catch (err) {
      throw new BadGatewayException('Can`t save file to storage', err);
    }
    return this.getFileUrlByName(filename);
  }
}
