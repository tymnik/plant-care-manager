import { Injectable } from '@nestjs/common';
import { Plant } from '@plant-care/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasePrismaCrudService } from 'src/shared/classes/BasePrismaCrudService';
import { ICRUDService } from 'src/shared/interfaces/crud/service/ICRUD';

@Injectable()
export class PlantService
  extends BasePrismaCrudService<
    Plant,
    Plant.Args.Create,
    Plant.Args.FindMany,
    Plant.Args.FindOne,
    Plant.Args.Delete,
    Plant.Args.Update
  >
  implements ICRUDService
{
  constructor(protected prisma: PrismaService) {
    super(prisma, 'plant');
  }
}
