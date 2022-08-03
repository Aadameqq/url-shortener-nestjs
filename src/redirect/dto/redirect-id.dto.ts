import { IsNotEmpty } from 'class-validator';

export class RedirectIdDto {
  @IsNotEmpty()
  public id: string;

  constructor(id: string) {
    this.id = id;
  }
}
