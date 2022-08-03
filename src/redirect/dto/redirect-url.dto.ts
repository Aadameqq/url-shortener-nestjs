import { IsNotEmpty } from 'class-validator';

export class RedirectUrlDto {
  @IsNotEmpty()
  public url: string;

  constructor(url: string) {
    this.url = url;
  }
}
