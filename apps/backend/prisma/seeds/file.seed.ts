import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';
import { uploadFakeImagesAndReturnScales } from './s3loader';

const prisma = new PrismaClient();
export async function createPlantFile(plant: Prisma.PlantCreateInput) {
  const fakerFile = async (
    plant: Prisma.PlantCreateInput,
  ): Promise<Prisma.FileCreateInput> => {
    const scales = (await uploadFakeImagesAndReturnScales(plant.id)) as any;
    const res: Prisma.FileCreateInput = {
      name: faker.system.fileName(),
      path: `admin/uploads/plant/${plant.id}/`,
      original: plant.id + faker.system.commonFileName('png'),
      isAdminContent: true,
      isAvatar: false,
      isPlantContent: true,
      isUserPlantCareContent: false,
      id: faker.string.uuid(),
      scales,
      plant: { create: plant },
    };
    return res;
  };
  return await prisma.file.create({
    data: { ...(await fakerFile(plant)) },
  });
}
