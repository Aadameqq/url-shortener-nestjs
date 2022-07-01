import { SchemaFactory } from '@nestjs/mongoose';
import { Url } from './url.entity';

export const UrlSchema = SchemaFactory.createForClass(Url);
