import { Module } from '@nestjs/common';
import { PlantService } from './plant.service';
import { PlantController } from './plant.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BasePrismaCrudService } from 'src/shared/classes/BasePrismaCrudService';

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
  imports: [PrismaModule],
})
export class PlantModule {}
