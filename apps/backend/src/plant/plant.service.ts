import { Injectable } from '@nestjs/common';
import { Plant } from '@plant-care/types';
import { ICRUDService } from 'src/interfaces/crud/service/ICRUD';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlantService implements ICRUDService {
  constructor(private readonly prismaService: PrismaService) {}
  create(data: Plant.Args.Create): Promise<Plant> {
    throw new Error('Method not implemented.');
  }
  findMany(params: Plant.Args.FindMany): Promise<Plant[]> {
    throw new Error('Method not implemented.');
  }
  findOne(whereUnique: Plant.Args.FoundOne): Promise<Plant | null> {
    throw new Error('Method not implemented.');
  }
  update(params: Plant.Args.Update): Promise<Plant> {
    throw new Error('Method not implemented.');
  }
  delete(where: Plant.Args.Delete): Promise<Plant> {
    throw new Error('Method not implemented.');
  }
}
