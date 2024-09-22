import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLoggerService implements LoggerService {
  log(message: string) {
    console.log(`INFO: ${message}`);
  }

  error(message: string, trace?: string) {
    console.error(`ERROR: ${message}`, trace);
  }

  warn(message: string) {
    console.warn(`WARN: ${message}`);
  }
}
