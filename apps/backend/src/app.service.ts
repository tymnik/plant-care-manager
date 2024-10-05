import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'I am Groot!!! Oh, I mean Plans API';
  }
}
