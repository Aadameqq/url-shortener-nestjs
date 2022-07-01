import { Controller, Get } from '@nestjs/common';
import { GetAuthUser } from '../auth/get-auth-user.decorator';
import { AuthUser } from '../auth/auth-user.entity';
import { UseAuth } from '../auth/use-auth.decorator';

@Controller('account')
export class UserAccountController {
  @Get('/')
  @UseAuth()
  read(@GetAuthUser() user: AuthUser) {
    return { id: user.id, username: user.username };
  }
}
