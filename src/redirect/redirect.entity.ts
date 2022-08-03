import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Redirect {
  public id: string;

  @Prop()
  public url: string;

  @Prop()
  public ownerId: string;

  @Prop({ default: 0 })
  public useCount: number;

  constructor(id, url, ownerId, useCount = 0) {
    this.id = id;
    this.url = url;
    this.ownerId = ownerId;
    this.useCount = useCount;
  }
}
