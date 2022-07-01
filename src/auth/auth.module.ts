import { DynamicModule, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenManager } from './token-manager';
import { PASSWORD_HASHER_PROVIDER } from './auth.constants';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '../config/config.module';

@Module({})
export class AuthModule {
  static forRootAsync = async (): Promise<DynamicModule> => {
    const bcrypt = await import('bcrypt');

    return {
      module: AuthModule,
      controllers: [AuthController],
      providers: [
        {
          provide: PASSWORD_HASHER_PROVIDER,
          useValue: bcrypt,
        },
        TokenManager,
        AuthService,
      ],
      imports: [UserModule, ConfigModule],
      exports: [TokenManager, AuthService],
    };
  };
}
