import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BasePrismaCrudService } from 'src/shared/classes/BasePrismaCrudService';
import { UserService } from './user.service';

@Module({
  providers: [
    {
      provide: 'model',
      useValue: 'user',
    },
    BasePrismaCrudService,
    UserService,
  ],
  imports: [PrismaModule],
  exports: [UserService],
})
export class UserModule {}
