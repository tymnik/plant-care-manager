import { Test, TestingModule } from '@nestjs/testing';
import { PlantCareService } from './plant-care.service';

describe('PlantCareService', () => {
  let service: PlantCareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantCareService],
    }).compile();

    service = module.get<PlantCareService>(PlantCareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
