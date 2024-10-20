import { Controller } from '@nestjs/common';
import { PlantCareService } from './plant-care.service';

@Controller('plant-care')
export class PlantCareController {
  constructor(private readonly plantCareService: PlantCareService) {}
}
