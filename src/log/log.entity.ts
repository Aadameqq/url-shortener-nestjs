import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Log {
  @Prop()
  public endpointUri: string;
  @Prop()
  public timeInMilliseconds: number;

  constructor(endpointUri, timeInMilliseconds) {
    this.endpointUri = endpointUri;
    this.timeInMilliseconds = timeInMilliseconds;
  }
}
