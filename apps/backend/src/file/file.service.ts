import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { File } from '@plant-care/types';
import { extname } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasePrismaCrudService } from 'src/shared/classes/BasePrismaCrudService';
import { S3Service } from './s3.service';
import { SharpService } from './sharp.service';

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
  async uploadPlantPhoto(file: Express.Multer.File, plantId: string) {
    const folder = `admin/uploads/plant/${plantId}`;
    const scales = [
      { width: 160, height: 160 },
      { width: 240, height: 240 },
      { width: 300, height: 300 },
    ];
    const resizedImgBuffers =
      await this.sharpService.resizeManyAndReturnBuffers(file, scales);
    const sizes = await this.uploadResizedArray(
      file,
      resizedImgBuffers,
      folder,
    );
    return await super.create({
      name: file.originalname || plantId,
      path: folder,
      original: sizes['original'],
      scales: sizes,
      isAdminContent: true,
    });
  }
  async uploadUserAvatar(file: Express.Multer.File, userId: string) {
    const folder = `user/uploads/${userId}/avatar/`;
    const scales = [
      { width: 40, height: 40 },
      { width: 300, height: 300 },
    ];
    const resizedImgBuffers =
      await this.sharpService.resizeManyAndReturnBuffers(file, scales);
    const sizes = await this.uploadResizedArray(
      file,
      resizedImgBuffers,
      folder,
    );
    return await super.create({
      name: file.originalname || userId,
      path: folder,
      original: sizes['original'],
      scales: sizes,
      isAvatar: true,
    });
  }
  async uploadUserPlantCarePhoto(
    file: Express.Multer.File,
    userId: string,
    plantCareId: string,
  ) {
    const folder = `user/uploads/${userId}/plant-care/${plantCareId}`;
    const scales = [
      { width: 40, height: 40 },
      { width: 300, height: 300 },
    ];
    const resizedImgBuffers =
      await this.sharpService.resizeManyAndReturnBuffers(file, scales);
    const sizes = await this.uploadResizedArray(
      file,
      resizedImgBuffers,
      folder,
    );
    return await super.create({
      name: file.originalname || userId,
      path: folder,
      original: sizes['original'],
      scales: sizes,
      isPlantContent: true,
      user: { connect: { id: userId } },
      userPlantCare: { connect: { id: plantCareId } },
    });
  }
  private createUniqueName(): string {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    return `${uniqueSuffix}`;
  }
}
