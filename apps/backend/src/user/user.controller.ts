import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
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
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { UserService } from './user.service';

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
  @Get('me/tending-plants')
  @ApiOkResponse({ type: UserWithPlantsDto })
  @UseGuards(AccessTokenGuard)
  myTendingPlants(@AuthUser() user: AuthUser): Promise<UserWithPlantsDto> {
    return this.userService.findTendingPlants(+user['sub']);
    throw new NotImplementedException();
  }
  @Get(':userId/tending-plants')
  @ApiOkResponse({ type: UserWithPlantsDto })
  @UseGuards(AccessTokenGuard)
  tendingPlants(@Param('id') id: string) {
    return this.userService.findTendingPlants(+id);
  }
}
