import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty({ default: 'TestNickname' })
  public username: string;
  @IsNotEmpty()
  @ApiProperty({ default: 'SecureTestPassword1234_' })
  public password: string;
}
