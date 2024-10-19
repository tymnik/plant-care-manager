import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
import { Plant } from '@plant-care/types';

const prisma = new PrismaClient();

const fakerPlant = (): Plant.Inputs.Create => ({
  name: faker.commerce.product(),
  cycle: '',
  watering: 'Frequent',
  depthWaterRequirement: '',
  volumeWaterRequirement: '',
  wateringPeriod: 'Morning',
  wateringGeneralBenchmark: '',
  pruningCount: '',
  flowers: false,
  fruits: false,
  cones: false,
  leaf: false,
  maintenance: 'High',
  medicinal: false,
  edibleLeaf: false,
  poisonousToHumans: false,
  poisonousToPets: false,
  droughtTolerant: false,
  saltTolerant: false,
  thorny: false,
  invasive: false,
  cuisine: false,
  indoor: false,
  careLevel: 'High',
  rareLevel: '',
  rare: false,
  description: faker.lorem.lines(),
});

async function main() {
  const fakerRounds = 10;
  dotenv.config();
  console.log('Seeding...');
  const data = [];
  for (let i = 0; i < fakerRounds; i++) {
    data.push(fakerPlant());
  }
  await prisma.user.createMany({ data, skipDuplicates: true });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
