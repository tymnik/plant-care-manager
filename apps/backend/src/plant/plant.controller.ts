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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  FindManyDto,
  PaginationDto,
  PlantCreateBodyDto,
  PlantIdPathParamsDto,
  PlantResponseDto,
  PlantUpdateBodyDto,
} from '@plant-care/dtos';
import { BaseCrudController } from 'src/shared/classes/BaseCrudController';
import { Pagination } from 'src/shared/classes/pagination';
import { ApiOkResponsePaginated } from 'src/shared/decorators/api-ok-response-paginated.decorator';
import { PlantService } from './plant.service';

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
  @ApiOkResponse({ type: PlantResponseDto })
  findOne(@Param() params: PlantIdPathParamsDto): Promise<PlantResponseDto> {
    return super.findOne(params);
  }
  @Get()
  @ApiOkResponsePaginated(PlantResponseDto)
  findAll(
    @Query() query: FindManyDto,
  ): Promise<PaginationDto<PlantResponseDto>> {
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
