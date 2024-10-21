import { Injectable } from '@nestjs/common';
import { PlantCare } from '@plant-care/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasePrismaCrudService } from 'src/shared/classes/BasePrismaCrudService';

@Injectable()
export class PlantCareService extends BasePrismaCrudService<
  PlantCare,
  PlantCare.Args.Create,
  PlantCare.Args.FindMany,
  PlantCare.Args.FindOne,
  PlantCare.Args.Delete,
  PlantCare.Args.Update
> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'userPlantCare');
  }
  findManyByUserId(userId: number) {
    this.findMany({ where: { userId } });
  }
}
