import {
  BadRequestException,
  Controller,
  forwardRef,
  Inject,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { extname } from 'path';
import { FileService } from './file.service';
import { CustomFileInterceptor } from './file.interseptor';

@Controller('file')
export class FileController {
  constructor(
    @Inject(forwardRef(() => FileService)) private fileService: FileService,
  ) {}
  @Post('admin/upload/plant')
  @UseInterceptors(CustomFileInterceptor)
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async upload(@UploadedFile() file: Express.Multer.File) {
    try {
      return this.fileService.uploadPlantPhoto(file, 'test-123');
    } catch (error) {
      throw new InternalServerErrorException(
        'Error uploading plant photo',
        error.message,
      );
    }
  }
}
