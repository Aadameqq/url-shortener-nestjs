import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../user/user.entity';

export const GetAuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { authUser } = ctx.switchToHttp().getRequest();

    if (!authUser) throw new Error('Auth user does not exist');

    return authUser as User;
  },
);
