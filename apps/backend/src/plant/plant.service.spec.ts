import { Test, TestingModule } from '@nestjs/testing';
import { PlantService } from './plant.service';
import { PrismaService } from '../prisma/prisma.service';
import { Plant } from '@plant-care/types';
import { faker } from '@faker-js/faker/.';
import dayjs = require('dayjs');
export const fakerPlant = () => ({
  name: faker.lorem.word(),
  scientificNames: [faker.lorem.word()],
  otherNames: [faker.lorem.word(), faker.lorem.word()],
  images: [faker.image.url()],
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

const mockPrismaService = {
  plant: {
    count: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('PlantService', () => {
  let plantService: PlantService;
  let prismaService: PrismaService;
  let mockPlant: Plant;
  let mockPlants: Plant[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlantService,
        { provide: PrismaService, useValue: mockPrismaService },
        {
          provide: 'model',
          useValue: 'user',
        },
      ],
    }).compile();

    plantService = module.get<PlantService>(PlantService);
    prismaService = module.get<PrismaService>(PrismaService);

    mockPlant = {
      id: 3,
      createAt: dayjs('2008-02-02').toDate(),
      updateAt: dayjs('2008-02-02').toDate(),
      ...fakerPlant(),
    };
    mockPlants = [
      {
        id: 2,
        createAt: dayjs('2008-02-02').toDate(),
        updateAt: dayjs('2008-02-02').toDate(),
        ...fakerPlant(),
      },
      {
        id: 1,
        createAt: dayjs('2008-02-02').toDate(),
        updateAt: dayjs('2008-02-02').toDate(),
        ...fakerPlant(),
      },
    ];
  });

  it('should be defined', () => {
    expect(plantService).toBeDefined();
  });

  // count
  describe('count', () => {
    it('should return the number of plants', async () => {
      mockPrismaService.plant.count.mockResolvedValue(5);
      const count = await plantService.count();
      expect(count).toBe(5);
      expect(prismaService.plant.count).toHaveBeenCalled();
    });
  });

  // findOne
  describe('findOne', () => {
    it('should find a plant by id', async () => {
      const mockPlant: Plant = {
        id: 1,
        createAt: dayjs('2008-02-02').toDate(),
        updateAt: dayjs('2008-02-02').toDate(),
        ...fakerPlant(),
      };
      mockPrismaService.plant.findUnique.mockResolvedValue(mockPlant);

      const plant = await plantService.findOne({ id: 1 });

      expect(plant).toEqual(mockPlant);
      expect(prismaService.plant.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return null if plant not found', async () => {
      mockPrismaService.plant.findUnique.mockResolvedValue(null);
      const plant = await plantService.findOne({ id: 999 });
      expect(plant).toBeNull();
    });
  });

  // findMany
  describe('findMany', () => {
    it('should return an array of plants', async () => {
      mockPrismaService.plant.findMany.mockResolvedValue(mockPlants);

      const plants = await plantService.findMany({});

      expect(plants).toEqual(mockPlants);
      expect(prismaService.plant.findMany).toHaveBeenCalled();
    });

    // ... Add more tests for findMany with where, orderBy, skip, take, etc.
    //     Similar to what we did for UserService
  });

  // create
  describe('create', () => {
    it('should create a new plant', async () => {
      const data = fakerPlant();
      const plantData: Plant.Args.Create = {
        ...data,
      };
      const mockCreatedPlant: Plant = {
        id: 3,
        createAt: dayjs('2008-02-02').toDate(),
        updateAt: dayjs('2008-02-02').toDate(),
        ...data,
      };
      mockPrismaService.plant.create.mockResolvedValue(mockCreatedPlant);

      const createdPlant = await plantService.create(plantData);

      expect(createdPlant).toEqual(mockCreatedPlant);
      expect(prismaService.plant.create).toHaveBeenCalledWith({
        data: plantData,
      });
    });

    // ... Add tests for error handling (e.g., unique constraint violations)
  });

  // update
  describe('update', () => {
    it('should update a plant', async () => {
      const plantIdToUpdate = 2;
      const updateData: Plant.Args.Update = {
        where: { id: plantIdToUpdate },
        data: { name: 'Updated Plant Name' /* ... */ },
      };
      const mockUpdatedPlant: Plant = {
        id: plantIdToUpdate,
        createAt: dayjs('2008-02-02').toDate(),
        updateAt: dayjs('2008-02-02').toDate(),
        ...fakerPlant(),
        name: 'Updated Plant Name',
      };
      mockPrismaService.plant.update.mockResolvedValue(mockUpdatedPlant);

      const updatedPlant = await plantService.update(updateData);

      expect(updatedPlant).toEqual(mockUpdatedPlant);
      expect(prismaService.plant.update).toHaveBeenCalledWith(updateData);
    });

    // ... Add tests for not found, unique constraint errors, etc.
  });

  // delete
  describe('delete', () => {
    it('should delete a plant', async () => {
      const plantIdToDelete = 1;
      const mockDeletedPlant: Plant = {
        id: plantIdToDelete,
        createAt: dayjs('2008-02-02').toDate(),
        updateAt: dayjs('2008-02-02').toDate(),
        ...fakerPlant(),
      };
      mockPrismaService.plant.delete.mockResolvedValue(mockDeletedPlant);

      const deletedPlant = await plantService.delete({ id: plantIdToDelete });

      expect(deletedPlant).toEqual(mockDeletedPlant);
      expect(prismaService.plant.delete).toHaveBeenCalledWith({
        where: { id: plantIdToDelete },
      });
    });

    // ... Add tests for not found, potential dependency errors
  });
});
