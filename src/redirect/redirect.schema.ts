import { SchemaFactory } from '@nestjs/mongoose';
import { Redirect } from './redirect.entity';

export const RedirectSchema = SchemaFactory.createForClass(Redirect);
