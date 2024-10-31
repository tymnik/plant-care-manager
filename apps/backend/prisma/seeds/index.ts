import * as dotenv from 'dotenv';
import { createPlantFile } from './file.seed';
import { fakerPlant } from './plant.seed';

dotenv.config();

async function seed() {
  const fakerRounds = 100;
  console.log('Seeding...');
  const data = [];
  for (let i = 0; i < fakerRounds; i++) {
    data.push(createPlantFile(fakerPlant()));
  }
  await Promise.all(data);
  console.log('Seeding finished.');
}
seed();
