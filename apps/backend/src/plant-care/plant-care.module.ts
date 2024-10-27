import { Module } from '@nestjs/common';
import { PlantCareService } from './plant-care.service';
import { PlantCareController } from './plant-care.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FileService } from 'src/file/services/file.service';
import { PlantCareFileService } from 'src/file/services/plant-care-file.service';
import { FileModule } from 'src/file/file.module';

@Module({
  controllers: [PlantCareController],
  providers: [
    {
      provide: 'model',
      useValue: 'plantCare',
    },
    {
      provide: FileService,
      useClass: PlantCareFileService,
    },
    PlantCareService,
  ],
  imports: [PrismaModule, FileModule],
})
export class PlantCareModule {}
