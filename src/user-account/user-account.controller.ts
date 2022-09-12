import { Controller, Get } from '@nestjs/common';
import { GetAuthUser } from '../auth/get-auth-user.decorator';
import { UseAuth } from '../auth/use-auth.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@Controller('account')
@ApiTags('Account')
export class UserAccountController {
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Reads user data' })
  @Get('/')
  @UseAuth()
  read(@GetAuthUser() user: User) {
    return { id: user.id, username: user.username };
  }
}
