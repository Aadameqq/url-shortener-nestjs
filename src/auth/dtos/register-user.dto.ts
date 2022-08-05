import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  @ApiProperty({
    description:
      'Nickname must be longer than 3 characters and shorter than 40 characters',
    default: 'TestNickname',
  })
  public username: string;

  @IsNotEmpty()
  @MinLength(10)
  @ApiProperty({
    description: 'Password must be longer than 10 characters',
    default: 'SecureTestPassword1234_',
  })
  public password: string;
}
