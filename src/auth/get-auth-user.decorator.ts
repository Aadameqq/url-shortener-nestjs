import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from './auth-user.entity';

export const GetAuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { authUser } = ctx.switchToHttp().getRequest();

    if (!authUser) throw new Error('Auth user does not exist');

    return authUser as AuthUser;
  },
);
