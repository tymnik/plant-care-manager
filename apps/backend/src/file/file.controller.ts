import {
  BadRequestException,
  Controller,
  forwardRef,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { extname } from 'path';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(
    @Inject(forwardRef(() => FileService)) private fileService: FileService,
  ) {}
  @Post('admin/upload/plant')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (file.filename !== 'file') {
          return callback(new BadRequestException('Invalid field name'), false);
        }

        const ext = extname(file.originalname).toLowerCase();
        if (!['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext)) {
          return callback(new BadRequestException('Invalid file type'), false);
        }

        const fileSize = parseInt(req.headers['content-length']);
        if (fileSize > 500 * 1024) {
          // 500kb
          return callback(new BadRequestException('File too large'), false);
        }

        callback(null, true);
      },
      limits: {
        fileSize: 500 * 1024, // 500kb
      },
    }),
  )
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
    return this.fileService.uploadPlantPhoto(file, 'test-123');
  }
}
