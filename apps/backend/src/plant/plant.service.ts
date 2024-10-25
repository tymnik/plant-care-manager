import { Inject, Injectable } from '@nestjs/common';
import { Plant } from '@plant-care/types';
import { PlantFileService } from 'src/file/services/plant-file.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasePrismaCrudWithFileService } from 'src/shared/classes/BaseCrudServiceWithFiles';
import { ICRUDService } from 'src/shared/interfaces/crud/service/ICRUD';

@Injectable()
export class PlantService
  extends BasePrismaCrudWithFileService<
    Plant,
    Plant.Args.Create,
    Plant.Args.FindMany,
    Plant.Args.FindOne,
    Plant.Args.Delete,
    Plant.Args.Update
  >
  implements ICRUDService
{
  constructor(
    protected prisma: PrismaService,
    protected readonly fileService: PlantFileService,
    @Inject('model') recourse: string,
  ) {
    super(prisma, fileService, recourse);
  }
}
