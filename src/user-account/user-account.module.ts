import { Module } from '@nestjs/common';
import { UserAccountController } from './user-account.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UserAccountController],
  imports: [AuthModule.forRootAsync()],
})
export class UserAccountModule {}
