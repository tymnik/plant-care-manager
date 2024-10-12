import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  PlantCreateBodyDto,
  PlantFindManyQueryDto,
  PlantIdPathParamsDto,
  PlantResponseDto,
  PlantUpdateBodyDto,
} from '@plant-care/dtos';
import { BaseCrudController } from 'src/shared/classes/BaseCrudController';
import { PlantService } from './plant.service';

@Controller('plant')
@ApiTags('Plant')
export class PlantController extends BaseCrudController<
  PlantResponseDto,
  PlantCreateBodyDto,
  PlantFindManyQueryDto,
  PlantIdPathParamsDto,
  PlantUpdateBodyDto
> {
  constructor(private readonly plantService: PlantService) {
    super(plantService);
  }
  @Post()
  create(
    @Body() createPlantDto: PlantCreateBodyDto,
  ): Promise<PlantResponseDto> {
    return super.create(createPlantDto);
  }
  @Get(':id')
  findOne(@Param() params: PlantIdPathParamsDto): Promise<PlantResponseDto> {
    return super.findOne(params);
  }
  @Get()
  findAll(@Body() body: PlantFindManyQueryDto): Promise<PlantResponseDto[]> {
    return super.findAll(body);
  }
  @Patch(':id')
  update(
    @Param() params: PlantIdPathParamsDto,
    @Body() body: PlantUpdateBodyDto,
  ): Promise<PlantResponseDto> {
    return super.update(params, body);
  }
  @Delete(':id')
  remove(params: PlantIdPathParamsDto): Promise<PlantResponseDto> {
    return super.remove(params);
  }
}
