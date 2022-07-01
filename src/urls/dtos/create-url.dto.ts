import { IsNotEmpty } from 'class-validator';

export class CreateUrlDto {
  @IsNotEmpty()
  public url: string;
}
