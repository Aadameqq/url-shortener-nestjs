import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogSchema } from './log.schema';
import { Log } from './log.entity';
import { LogService } from './log.service';
import { LogRepository } from './log.repository';
import { LogInterceptor } from './log.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  providers: [
    LogService,
    LogRepository,
    LogInterceptor,
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
  ],
  exports: [],
})
export class LogModule {}
