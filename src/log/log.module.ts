import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogInterceptor } from './log.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DatabaseModule } from '../database/database.module';
import { Log } from './log.entity';
import { LOG_REPOSITORY } from './log.constants';

@Module({
  imports: [
    DatabaseModule.forFeature({
      entity: Log,
      entityInjectionString: LOG_REPOSITORY,
    }),
  ],
  providers: [
    LogService,
    LogInterceptor,
    {
      provide: APP_INTERCEPTOR,
      useClass: LogInterceptor,
    },
  ],
  exports: [],
})
export class LogModule {}
