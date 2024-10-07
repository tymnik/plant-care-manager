import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Ping')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  @ApiResponse({ type: String })
  ping(): string {
    return this.appService.ping();
  }
}
