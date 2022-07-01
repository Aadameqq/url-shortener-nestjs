import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';

import { PASSWORD_HASHER_PROVIDER, SALT_ROUNDS } from './auth.constants';
import { TokenManager } from './token-manager';
import { User } from '../user/user.entity';
import { IPasswordHasher } from './interfaces/password-hasher.interface';
import { AuthUser } from './auth-user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PASSWORD_HASHER_PROVIDER) private passwordHasher: IPasswordHasher,
    private userRepository: UserRepository,
    private tokenManager: TokenManager,
  ) {}

  async loginUserAndGetToken(
    username: string,
    password: string,
  ): Promise<string> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) throw new UnauthorizedException();

    const isPasswordValid = await this.passwordHasher.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) throw new UnauthorizedException();

    return this.tokenManager.createToken(
      { id: user.id, username: user.username },
      '1h',
    );
  }
  async registerUser(username: string, password: string): Promise<boolean> {
    const hashedPassword = await this.passwordHasher.hash(
      password,
      SALT_ROUNDS,
    );

    await this.userRepository.create(
      new User(undefined, username, hashedPassword),
    );

    return true;
  }

  async fetchAuthUserIfValid(token: string) {
    if (!token) return false;

    const authUser =
      this.tokenManager.validateTokenAndFetchData<AuthUser>(token);

    if (!authUser) return false;

    return authUser;
  }
}
