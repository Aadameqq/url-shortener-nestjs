import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class User {
  public id: string;

  @Prop()
  public username: string;

  @Prop()
  public password: string;

  constructor(id: string, username: string, password: string) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}
