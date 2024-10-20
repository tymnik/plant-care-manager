import { Module } from '@nestjs/common';
import { PlantCareService } from './plant-care.service';
import { PlantCareController } from './plant-care.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PlantCareController],
  providers: [
    {
      provide: 'model',
      useValue: 'plantCare',
    },
    PlantCareService,
  ],
  imports: [PrismaModule],
})
export class PlantCareModule {}
