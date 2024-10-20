import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  FindManyDto,
  PaginationDto,
  PlantCreateBodyDto,
  PlantIdPathParamsDto,
  PlantResponseDto,
  PlantUpdateBodyDto,
} from '@plant-care/dtos';
import { BaseCrudController } from 'src/shared/classes/BaseCrudController';
import { ApiOkResponsePaginated } from 'src/shared/decorators/api-ok-response-paginated.decorator';
import { PlantService } from './plant.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

@Controller('plant')
@ApiTags('Plant')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
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
  delete(params: PlantIdPathParamsDto): Promise<PlantResponseDto> {
    return super.delete(params);
  }
}
