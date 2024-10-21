import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { tr } from '@faker-js/faker/.';
import { CustomFileInterceptor } from './file.interseptor';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post('upload')
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
  async upload(@UploadedFile() file: Express.Multer.File) {}
}
