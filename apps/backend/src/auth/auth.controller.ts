import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  LoginBodyDto,
  RefreshBodyDto,
  RegisterBodyDto,
} from '@plant-care/dtos';
import { AuthService } from './auth.service';
import { AuthUser } from './decorators/user.decorator';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: LoginBodyDto) {
    return this.authService.login(body);
  }
  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  signup(@Body() body: RegisterBodyDto) {
    return this.authService.signup(body);
  }
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@AuthUser() user: AuthUser) {
    this.authService.logout(+user['sub']);
  }
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @ApiBody({ type: RefreshBodyDto })
  refreshTokens(@AuthUser() user: AuthUser) {
    const userId = user['sub'];
    const refreshToken = user['refreshToken'];
    return this.authService.refreshTokens(+userId, refreshToken);
  }
}
