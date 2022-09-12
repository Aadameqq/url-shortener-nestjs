import { Inject, Injectable } from '@nestjs/common';
import { Log } from './log.entity';
import { LOG_REPOSITORY } from './log.constants';
import { Repository } from 'typeorm';

@Injectable()
export class LogService {
  constructor(@Inject(LOG_REPOSITORY) private logRepository: Repository<Log>) {}
  async saveLogInDatabase(timeInMilliseconds: number, endpointUrl: string) {
    await this.logRepository.save(new Log(endpointUrl, timeInMilliseconds));
  }
}
