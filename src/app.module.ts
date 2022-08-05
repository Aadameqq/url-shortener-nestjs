import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { LogModule } from './log/log.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserAccountModule } from './user-account/user-account.module';
import { RedirectModule } from './redirect/redirect.module';
import { ConfigService } from './config/config.service';

const CONFIG_FILE_PATH = '../.development.env';

@Module({
  imports: [
    ConfigModule.register(CONFIG_FILE_PATH),
    LogModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule.register(CONFIG_FILE_PATH)],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    UserAccountModule,
    RedirectModule,
  ],
  providers: [],
})
export class AppModule {}
