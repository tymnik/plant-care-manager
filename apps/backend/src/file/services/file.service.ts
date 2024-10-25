import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { File } from '@plant-care/types';
import { extname } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasePrismaCrudService } from 'src/shared/classes/BasePrismaCrudService';
import { S3Service } from '../s3.service';
import { SharpService } from '../sharp.service';

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
    protected readonly s3Service: S3Service,
    @Inject(forwardRef(() => SharpService))
    protected readonly sharpService: SharpService,
  ) {
    super(prisma, 'file');
  }
  async uploadResizedArray(
    originFile: Express.Multer.File,
    resizedImgBuffers: { [key: string]: Buffer }[],
    folder,
  ) {
    const extArgs = extname(originFile.originalname);
    return (
      await Promise.all([
        {
          original: await this.s3Service.upload(
            originFile.buffer,
            `${folder}/original.${extArgs}`,
            originFile.mimetype,
          ),
        },
        ...resizedImgBuffers.map(async (obj) => {
          for (const [key, buffer] of Object.entries(obj)) {
            return {
              [`${key}`]: await this.s3Service.upload(
                buffer,
                `${folder}/${key}.${extArgs}`,
                originFile.mimetype,
              ),
            };
          }
        }),
      ])
    ).reduce((acc, cur) => ({ ...acc, ...cur }), {});
  }

  protected async removeByFile(file: File) {
    await this.s3Service.remove(file.path);
    return await super.delete({ id: file.id });
  }
  protected createUniqueName(): string {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    return `${uniqueSuffix}`;
  }
  upload(file: Express.Multer.File, ...args: any) {
    throw new Error('Method not implemented.');
  }
  remove(id: string): void | Promise<void> {
    throw new Error('Method not implemented.');
  }
}
