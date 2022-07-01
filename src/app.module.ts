import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { LogModule } from './log/log.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserAccountModule } from './user-account/user-account.module';
import { UrlsModule } from './urls/urls.module';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../', '.development.env') });

@Module({
  imports: [
    ConfigModule.registerAsync('../.development.env'),
    LogModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    AuthModule.forRootAsync(),
    UserAccountModule,
    UrlsModule,
  ],
  providers: [],
})
export class AppModule {}
