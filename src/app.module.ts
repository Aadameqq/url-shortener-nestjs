import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { LogModule } from './log/log.module';
import { AuthModule } from './auth/auth.module';
import { UserAccountModule } from './user-account/user-account.module';
import { RedirectModule } from './redirect/redirect.module';

@Module({
  imports: [
    ConfigModule.register(),
    LogModule,
    AuthModule,
    UserAccountModule,
    RedirectModule,
    DatabaseModule,
  ],
  providers: [],
})
export class AppModule {}
