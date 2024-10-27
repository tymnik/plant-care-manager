import { Module } from '@nestjs/common';
import { PlantService } from './plant.service';
import { PlantController } from './plant.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BasePrismaCrudService } from 'src/shared/classes/BasePrismaCrudService';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [PlantController],
  providers: [
    {
      provide: 'model',
      useValue: 'plant',
    },
    BasePrismaCrudService,
    PlantService,
  ],
  imports: [PrismaModule, AuthModule, JwtModule],
})
export class PlantModule {}
