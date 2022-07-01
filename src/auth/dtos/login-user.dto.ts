import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  public username: string;
  @IsNotEmpty()
  public password: string;
}
