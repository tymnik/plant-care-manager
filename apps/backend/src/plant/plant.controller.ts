import {
  Body,
  Controller,
  Delete,
  Get,
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
import { ApiOkResponsePaginated } from 'src/shared/decorators/api-ok-response-paginated.decorator';
import { PlantService } from './plant.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CustomFileInterceptor } from 'src/file/interceptors/file.interceptor';

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
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
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
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(
    @Param() params: PlantIdPathParamsDto,
    @Body() body: PlantUpdateBodyDto,
  ): Promise<PlantResponseDto> {
    return super.update(params, body);
  }
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  delete(params: PlantIdPathParamsDto): Promise<PlantResponseDto> {
    return super.delete(params);
  }

  @Post(':id/upload/image')
  @UseInterceptors(CustomFileInterceptor)
  @ApiOperation({ summary: 'Upload a file' })
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
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  async uploadFile(@UploadedFile() file, @Param('id') id: string) {
    this.plantService.upload(file, id);
  }
}
