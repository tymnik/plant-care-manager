import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  AuthResponseDto,
  LoginBodyDto,
  RegisterBodyDto,
} from '@plant-care/dtos';
import { AuthService } from './auth.service';

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
  @Post('/registration')
  registration(@Body() body: RegisterBodyDto) {
    return this.authService.registration(body);
  }
}
