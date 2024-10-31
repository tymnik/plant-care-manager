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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
import { CustomFileInterceptor } from 'src/file/interceptors/file.interceptor';

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
  @Post(':id/upload/images')
  @UseInterceptors(CustomFileInterceptor)
  @ApiOperation({ summary: 'Upload a avatar' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadAvatar(@UploadedFile() file, @Param('id') id: string) {
    const plantCare = await this.plantCareService.findOne({ id });
    this.plantCareService.upload(file, plantCare.userId, id);
  }
}
