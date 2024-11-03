import * as dotenv from 'dotenv';
import { createPlantFile } from './file.seed';
import { fakerPlant } from './plant.seed';
const { Command } = require('commander');
const program = new Command();
dotenv.config();

program.option('-r, --rounds <number>');

program.parse();

const options = program.opts();
console.log(options.rounds);

const rounds = options.rounds;

async function seed() {
  const fakerRounds = +rounds || 100;
  console.log('Seeding...');
  const data = [];
  for (let i = 0; i < fakerRounds; i++) {
    data.push(createPlantFile(fakerPlant()));
  }
  await Promise.all(data);
  console.log('Seeding finished.');
}
seed();
