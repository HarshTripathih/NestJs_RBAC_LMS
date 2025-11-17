import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  resetData(): string {
    // Logic to reset data goes here
    return 'Data has been reset.';
  }
}
