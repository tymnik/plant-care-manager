import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import { UserDto, UserWithPlantsDto } from '@plant-care/dtos';
// import { PlantCareDto } from '@plant-care/dtos';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { UserService } from './user.service';
import { PlantCareResponseDto } from '@plant-care/dtos';

@Controller('user')
@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @SerializeOptions({
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: OmitType(UserDto, ['password', 'refreshToken']),
  })
  async me(@AuthUser() user: AuthUser): Promise<UserDto> {
    return await this.userService.me(+user['sub']);
  }
  @Get('me/plants')
  @ApiOkResponse({ type: [PlantCareResponseDto] })
  @UseGuards(AccessTokenGuard)
  myTendingPlants(@AuthUser() user: AuthUser): Promise<PlantCareResponseDto[]> {
    return this.userService.findTendingPlants(+user['sub']);
  }
  @Get(':id/plants')
  @ApiOkResponse({ type: UserWithPlantsDto })
  @UseGuards(AccessTokenGuard)
  tendingPlants(@Param('id') id: string): Promise<PlantCareResponseDto[]> {
    return this.userService.findTendingPlants(+id);
  }
}
