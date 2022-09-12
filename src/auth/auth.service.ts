import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { PASSWORD_HASHER_PROVIDER, SALT_ROUNDS } from './auth.constants';
import { TokenManager } from './token-manager';
import { User } from '../user/user.entity';
import { IPasswordHasher } from './interfaces/password-hasher.interface';
import { TokenData } from './interfaces/token-data.interface';
import { USER_REPOSITORY } from '../user/user.constants';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PASSWORD_HASHER_PROVIDER) private passwordHasher: IPasswordHasher,
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
    private tokenManager: TokenManager,
  ) {}

  async loginUserAndGetToken(
    username: string,
    password: string,
  ): Promise<string> {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) throw new UnauthorizedException();

    const isPasswordValid = await this.passwordHasher.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) throw new UnauthorizedException();

    return this.tokenManager.createToken({ id: user.id }, '1h');
  }
  async registerUser(username: string, password: string): Promise<boolean> {
    const hashedPassword = await this.passwordHasher.hash(
      password,
      SALT_ROUNDS,
    );

    await this.userRepository.save(new User(username, hashedPassword));

    return true;
  }

  async fetchUserIfValid(token: string) {
    if (!token) return false;

    const tokenData =
      this.tokenManager.validateTokenAndFetchData<TokenData>(token);

    if (!tokenData) return false;

    return await this.userRepository.findOne({
      where: { id: tokenData.id },
      relations: { redirects: true },
    });
  }
}
