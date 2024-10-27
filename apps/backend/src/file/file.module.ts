import { Module } from '@nestjs/common';
import { FileService } from './services/file.service';
import { FileController } from './file.controller';
import { S3Service } from './s3.service';
import { SharpService } from './sharp.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PlantFileService } from './services/plant-file.service';
import { PlantCareService } from 'src/plant-care/plant-care.service';
import { UserFileService } from './services/user-file.service';
import { PlantCareFileService } from './services/plant-care-file.service';

@Module({
  imports: [PrismaModule],
  controllers: [FileController],
  providers: [
    FileService,
    PlantFileService,
    PlantCareFileService,
    UserFileService,
    S3Service,
    SharpService,
    {
      provide: 'model',
      useValue: 'file',
    },
  ],
  exports: [
    FileService,
    PlantFileService,
    PlantCareFileService,
    UserFileService,
    S3Service,
    SharpService,
  ],
})
export class FileModule {}
