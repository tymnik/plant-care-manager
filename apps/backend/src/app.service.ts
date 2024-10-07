import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ping(): string {
    return 'I am Groot!!! Oh, I mean Plans API';
  }
}
