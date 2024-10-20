import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasePrismaCrudService } from 'src/shared/classes/BasePrismaCrudService';

@Injectable()
export class PlantCareService extends BasePrismaCrudService<
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown
> {
  constructor(protected prisma: PrismaService) {
    super(prisma, 'plantCare');
  }
}
