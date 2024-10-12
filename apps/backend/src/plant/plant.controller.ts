import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  FindManyDto,
  PlantCreateBodyDto,
  PlantFindManyQueryDto,
  PlantIdPathParamsDto,
  PlantResponseDto,
  PlantUpdateBodyDto,
} from '@plant-care/dtos';
import { BaseCrudController } from 'src/shared/classes/BaseCrudController';
import { PlantService } from './plant.service';
import { query } from 'express';
import { Pagination } from 'src/shared/classes/pagination';

@Controller('plant')
@ApiTags('Plant')
export class PlantController extends BaseCrudController<
  PlantResponseDto,
  PlantCreateBodyDto,
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
  findAll(@Query() query: FindManyDto): Promise<Pagination<PlantResponseDto>> {
    return super.findAll(query);
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
