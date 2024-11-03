import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BasePrismaCrudService } from 'src/shared/classes/BasePrismaCrudService';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { FileModule } from 'src/file/file.module';
import { FileService } from 'src/file/services/file.service';
import { UserFileService } from 'src/file/services/user-file.service';

@Module({
  providers: [
    {
      provide: 'model',
      useValue: 'user',
    },
    {
      provide: FileService,
      useClass: UserFileService,
    },
    BasePrismaCrudService,
    UserService,
  ],
  imports: [PrismaModule, ConfigModule, JwtModule.register({}), FileModule],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
