import { Module } from '@nestjs/common';
import { RedirectController } from './redirect.controller';
import { RedirectService } from './redirect.service';
import { AuthModule } from '../auth/auth.module';
import { Redirect } from './redirect.entity';
import { DatabaseModule } from '../database/database.module';
import { REDIRECT_REPOSITORY } from './redirect.constants';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    DatabaseModule.forFeature({
      entity: Redirect,
      entityInjectionString: REDIRECT_REPOSITORY,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [RedirectController],
  providers: [RedirectService],
})
export class RedirectModule {}
