import { InjectModel } from '@nestjs/mongoose';
import { Log } from './log.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LogRepository {
  constructor(@InjectModel(Log.name) private logModel) {}

  async create(log: Log) {
    await new this.logModel(log).save();
  }
}
