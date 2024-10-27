import { Injectable } from '@nestjs/common';
import { PlantCare } from '@plant-care/types';
import { PlantCareFileService } from 'src/file/services/plant-care-file.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasePrismaCrudWithFileService } from 'src/shared/classes/BaseCrudServiceWithFiles';
import { BasePrismaCrudService } from 'src/shared/classes/BasePrismaCrudService';

@Injectable()
export class PlantCareService extends BasePrismaCrudWithFileService<
  PlantCare,
  PlantCare.Args.Create,
  PlantCare.Args.FindMany,
  PlantCare.Args.FindOne,
  PlantCare.Args.Delete,
  PlantCare.Args.Update
> {
  constructor(
    protected prisma: PrismaService,
    protected fileService: PlantCareFileService,
  ) {
    super(prisma, fileService, 'userPlantCare');
  }
  findManyByUserId(userId: string) {
    this.findMany({ where: { userId } });
  }
}
