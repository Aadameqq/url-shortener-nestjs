import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  public username: string;

  @IsNotEmpty()
  @MinLength(10)
  public password: string;
}
