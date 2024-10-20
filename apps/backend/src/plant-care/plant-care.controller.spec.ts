import { Test, TestingModule } from '@nestjs/testing';
import { PlantCareController } from './plant-care.controller';
import { PlantCareService } from './plant-care.service';

describe('PlantCareController', () => {
  let controller: PlantCareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantCareController],
      providers: [PlantCareService],
    }).compile();

    controller = module.get<PlantCareController>(PlantCareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
