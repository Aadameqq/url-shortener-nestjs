import { Module } from '@nestjs/common';
import { RedirectController } from './redirect.controller';
import { RedirectService } from './redirect.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RedirectSchema } from './redirect.schema';
import { AuthModule } from '../auth/auth.module';
import { RedirectRepository } from './redirect.repository';
import { Redirect } from './redirect.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Redirect.name, schema: RedirectSchema },
    ]),
    AuthModule,
  ],
  controllers: [RedirectController],
  providers: [RedirectService, RedirectRepository],
})
export class RedirectModule {}
