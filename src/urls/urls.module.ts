import { Module } from '@nestjs/common';
import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Url } from './url.entity';
import { UrlSchema } from './url.schema';
import { AuthModule } from '../auth/auth.module';
import { UrlsRepository } from './urls.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]),
    AuthModule.forRootAsync(),
  ],
  controllers: [UrlsController],
  providers: [UrlsService, UrlsRepository],
})
export class UrlsModule {}
