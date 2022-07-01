import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const token = await this.authService.loginUserAndGetToken(
      loginUserDto.username,
      loginUserDto.password,
    );

    return { token };
  }

  @Post('/register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    const isSuccess = await this.authService.registerUser(
      registerUserDto.username,
      registerUserDto.password,
    );

    if (!isSuccess) throw new BadRequestException();

    return;
  }
}
