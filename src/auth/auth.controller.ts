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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Creates access token for given user' })
  @ApiOkResponse({ description: 'Logged in successfully' })
  @ApiUnauthorizedResponse({ description: 'Credentials were incorrect' })
  @ApiBadRequestResponse({ description: 'Login or password was empty' })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const token = await this.authService.loginUserAndGetToken(
      loginUserDto.username,
      loginUserDto.password,
    );

    return { token };
  }

  @ApiOperation({ summary: 'Creates new user' })
  @ApiCreatedResponse({ description: 'Created new Account' })
  @ApiBadRequestResponse({ description: "Given data didn't pass validation" })
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
