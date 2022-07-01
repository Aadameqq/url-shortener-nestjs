import { Log } from './log.entity';
import { SchemaFactory } from '@nestjs/mongoose';

export const LogSchema = SchemaFactory.createForClass(Log);
