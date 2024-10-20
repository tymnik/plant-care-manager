import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  FindManyDto,
  PlantCareCreateBodyDto,
  PlantCareIdPathParamsDto,
  PlantCareResponseDto,
  PlantCareUpdateBodyDto,
} from '@plant-care/dtos';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { BaseCrudController } from 'src/shared/classes/BaseCrudController';
import { Pagination } from 'src/shared/classes/pagination';
import { ApiOkResponsePaginated } from 'src/shared/decorators/api-ok-response-paginated.decorator';
import { PlantCareService } from './plant-care.service';

@Controller('plant-care')
@ApiTags('Plant care')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
export class PlantCareController extends BaseCrudController<
  PlantCareResponseDto,
  PlantCareCreateBodyDto,
  PlantCareIdPathParamsDto,
  PlantCareUpdateBodyDto
> {
  constructor(private readonly plantCareService: PlantCareService) {
    super(plantCareService);
  }
  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    type: PlantCareResponseDto,
  })
  create(
    @Body() createPlantDto: PlantCareCreateBodyDto,
  ): Promise<PlantCareResponseDto> {
    return super.create(createPlantDto);
  }
  @Get()
  @ApiOkResponsePaginated(PlantCareResponseDto)
  async findAll(
    @Query() body: FindManyDto,
  ): Promise<Pagination<PlantCareResponseDto>> {
    return super.findAll(body);
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: PlantCareResponseDto,
  })
  findOne(
    @Param() params: PlantCareIdPathParamsDto,
  ): Promise<PlantCareResponseDto> {
    return super.findOne(params);
  }
  @Patch(':id')
  @ApiParam({
    type: PlantCareIdPathParamsDto,
    name: 'id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PlantCareResponseDto,
  })
  update(
    @Param() params: PlantCareIdPathParamsDto,
    @Body() updatePlantDto: PlantCareUpdateBodyDto,
  ): Promise<PlantCareResponseDto> {
    return super.update(params, updatePlantDto);
  }
  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: PlantCareResponseDto,
  })
  delete(
    @Param() params: PlantCareIdPathParamsDto,
  ): Promise<PlantCareResponseDto> {
    return super.delete(params);
  }
}
