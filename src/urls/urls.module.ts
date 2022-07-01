import { Module } from '@nestjs/common';
import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Url } from './url.entity';
import { UrlSchema } from './url.schema';
import { AuthModule } from '../auth/auth.module';
import { UrlsRepository } from './urls.repository';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]),
    AuthModule.forRootAsync(),
    CommonModule,
  ],
  controllers: [UrlsController],
  providers: [UrlsService, UrlsRepository],
})
export class UrlsModule {}
