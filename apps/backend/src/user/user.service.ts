import { Injectable } from '@nestjs/common';
import { User } from '@plant-care/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasePrismaCrudService } from 'src/shared/classes/BasePrismaCrudService';
import { ICRUDService } from 'src/shared/interfaces/crud/service/ICRUD';

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
  constructor(prisma: PrismaService) {
    super(prisma, 'user');
  }
  async findByEmail(email: string) {
    return await this.findOne({ email });
  }
  async me(userId: number): Promise<User> {
    return await this.findOne({ id: userId });
  }
}
