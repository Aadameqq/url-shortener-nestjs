import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RedirectUrlDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Url to which you want the identifier to redirect',
    default: 'http://localhost:5500/test',
  })
  public url: string;

  constructor(url: string) {
    this.url = url;
  }
}
