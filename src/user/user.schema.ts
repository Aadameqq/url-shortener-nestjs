import { SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.entity';

export const UserSchema = SchemaFactory.createForClass(User);
