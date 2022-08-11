import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  server(): string {
    return 'Server is running';
  }
}
