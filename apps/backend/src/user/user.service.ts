import { Injectable } from '@nestjs/common';
import { User } from '@plant-care/types';
import { PlantCareService } from 'src/plant-care/plant-care.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasePrismaCrudService } from 'src/shared/classes/BasePrismaCrudService';
import { ICRUDService } from 'src/shared/interfaces/crud/service/ICRUD';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService
  extends BasePrismaCrudService<
    User,
    User.Args.Create,
    User.Args.FindMany,
    User.Args.FindOne,
    User.Args.Delete,
    User.Args.Update
  >
  implements ICRUDService
{
  constructor(
    prisma: PrismaService,
    private readonly plantCareService: PlantCareService,
  ) {
    super(prisma, 'user');
  }
  async findByEmail(email: string) {
    return await this.findOne({ email });
  }
  async me(userId: number): Promise<User> {
    return await this.findOne({ id: userId });
  }
  async findTendingPlants(id: number): Promise<User.Response.WithPlantCare> {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        plantCare: true,
      },
    });
  }
}
