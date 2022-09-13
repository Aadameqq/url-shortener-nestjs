import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenManager } from './token-manager';
import { PASSWORD_HASHER_PROVIDER } from './auth.constants';
import { UserModule } from '../user/user.module';
import * as bcrypt from 'bcrypt';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: PASSWORD_HASHER_PROVIDER,
      useValue: bcrypt,
    },
    TokenManager,
    AuthService,
  ],
  imports: [UserModule],
  exports: [TokenManager, AuthService],
})
export class AuthModule {}
