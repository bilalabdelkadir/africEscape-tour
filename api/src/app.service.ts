import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    Logger.log('Hello World!');
    return 'Hello World!';
  }
}
