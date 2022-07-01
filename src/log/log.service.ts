import { Injectable } from '@nestjs/common';
import { Log } from './log.entity';
import { LogRepository } from './log.repository';

@Injectable()
export class LogService {
  constructor(private logRepository: LogRepository) {}
  async saveLogInDatabase(timeInMilliseconds: number, endpointUrl: string) {
    await this.logRepository.create(new Log(endpointUrl, timeInMilliseconds));
  }
}
