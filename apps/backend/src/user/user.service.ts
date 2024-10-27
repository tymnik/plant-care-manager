import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { File, PlantCare, User } from '@plant-care/types';
import { UserFileService } from 'src/file/services/user-file.service';
import { PlantCareService } from 'src/plant-care/plant-care.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BasePrismaCrudWithFileService } from 'src/shared/classes/BaseCrudServiceWithFiles';
import { ICRUDService } from 'src/shared/interfaces/crud/service/ICRUD';

@Injectable()
export class UserService
  extends BasePrismaCrudWithFileService<
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
    protected prisma: PrismaService,
    @Inject(forwardRef(() => UserFileService))
    protected readonly fileService: UserFileService,
    protected readonly plantCareService: PlantCareService,
    @Inject('model') recourse: string,
  ) {
    super(prisma, fileService, recourse);
  }
  async findByEmail(email: string) {
    return await this.findOne({ email });
  }
  async me(userId: string): Promise<User & { avatar: File }> {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      include: { avatar: true },
    });
  }
  async findTendingPlants(id: string): Promise<PlantCare[]> {
    return await this.plantCareService.findMany({ where: { userId: id } });
  }
}
