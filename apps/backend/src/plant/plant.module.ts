import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { FileService } from 'src/file/services/file.service';
import { PlantFileService } from 'src/file/services/plant-file.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BasePrismaCrudService } from 'src/shared/classes/BasePrismaCrudService';
import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';
import { FileModule } from 'src/file/file.module';
import { BasePrismaCrudWithFileService } from 'src/shared/classes/BaseCrudServiceWithFiles';

@Module({
  controllers: [PlantController],
  providers: [
    {
      provide: 'model',
      useValue: 'plant',
    },
    {
      provide: FileService,
      useClass: PlantFileService,
    },
    BasePrismaCrudService,
    BasePrismaCrudWithFileService,
    PlantService,
  ],
  imports: [PrismaModule, AuthModule, JwtModule, FileModule],
})
export class PlantModule {}
