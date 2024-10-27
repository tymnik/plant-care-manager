import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

export const fakerPlant = () => ({
  name: faker.lorem.word(),
  scientificNames: [faker.lorem.word()],
  otherNames: [faker.lorem.word(), faker.lorem.word()],
  cycle: faker.helpers.arrayElement(['Annual', 'Perennial', 'Biennial']),
  watering: faker.helpers.arrayElement([
    'Frequent',
    'Occasional',
    'Infrequent',
    'Rare',
  ]),
  depthWaterRequirement: `${faker.number.int({ min: 1, max: 10 })} inches`,
  volumeWaterRequirement: `${faker.number.int({ min: 1, max: 5 })} gallons`,
  wateringPeriod: faker.helpers.arrayElement([
    'Morning',
    'Afternoon',
    'Evening',
  ]),
  wateringGeneralBenchmark: faker.lorem.sentence(),
  sunlight: [
    faker.helpers.arrayElement(['FullSun', 'PartialShade', 'FullShade']),
  ],
  pruningMonths: [
    faker.helpers.arrayElement([
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]),
  ],
  pruningCount: `${faker.number.int({ min: 1, max: 4 })} times`,
  flowers: faker.datatype.boolean(),
  floweringSeason: faker.helpers.arrayElement([
    'Spring',
    'Summer',
    'Autumn',
    'Winter',
  ]),
  fruits: faker.datatype.boolean(),
  cones: faker.datatype.boolean(),
  fruitingSeasons: [
    faker.helpers.arrayElement(['Spring', 'Summer', 'Autumn', 'Winter']),
    faker.helpers.arrayElement(['Spring', 'Summer', 'Autumn', 'Winter']),
  ],
  harvestSeasons: [
    faker.helpers.arrayElement(['Spring', 'Summer', 'Autumn', 'Winter']),
    faker.helpers.arrayElement(['Spring', 'Summer', 'Autumn', 'Winter']),
  ],
  harvestMethods: faker.helpers.arrayElement([
    'Cutting',
    'Picking',
    'Digging',
    'Slicing',
    'Pulling',
  ]),
  leaf: faker.datatype.boolean(),
  growthRate: faker.helpers.arrayElement(['High', 'Medium', 'Low', 'Slow']),
  maintenance: faker.helpers.arrayElement(['High', 'Medium', 'Low']),
  medicinal: faker.datatype.boolean(),
  edibleLeaf: faker.datatype.boolean(),
  poisonousToHumans: faker.datatype.boolean(),
  poisonousToPets: faker.datatype.boolean(),
  droughtTolerant: faker.datatype.boolean(),
  saltTolerant: faker.datatype.boolean(),
  thorny: faker.datatype.boolean(),
  invasive: faker.datatype.boolean(),
  cuisine: faker.datatype.boolean(),
  indoor: faker.datatype.boolean(),
  careLevel: faker.helpers.arrayElement(['High', 'Medium', 'Low']),
  rareLevel: faker.lorem.word(),
  rare: faker.datatype.boolean(),
  description: faker.lorem.paragraph(),
});

async function plantSeed() {
  const fakerRounds = 100;
  dotenv.config();
  console.log('Seeding...');
  const data = [];
  for (let i = 0; i < fakerRounds; i++) {
    data.push(fakerPlant());
  }
  await prisma.plant.createMany({ data, skipDuplicates: true });
  console.log('Seeding finished.');
}
export default () =>
  plantSeed()
    .catch((e) => console.error(e))
    .finally(async () => {
      await prisma.$disconnect();
    });
