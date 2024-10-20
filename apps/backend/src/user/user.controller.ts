import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { UserDto } from '@plant-care/dtos';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiBearerAuth()
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
  myTendingPlants() {
    throw new NotImplementedException();
  }
  @Get(':userId/tending-plants')
  tendingPlants() {
    throw new NotImplementedException();
  }
}
