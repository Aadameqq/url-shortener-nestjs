import { IsNotEmpty } from 'class-validator';

export class RedirectUrlDto {
  @IsNotEmpty()
  public id: string;
}
