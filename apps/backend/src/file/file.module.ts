import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { S3Service } from './s3.service';
import { SharpService } from './sharp.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FileController],
  providers: [
    FileService,
    S3Service,
    SharpService,
    {
      provide: 'model',
      useValue: 'user',
    },
  ],
})
export class FileModule {}
