import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

export const UseAuth = () => UseGuards(AuthGuard);
