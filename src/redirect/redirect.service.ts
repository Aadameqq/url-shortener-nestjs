import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Redirect } from './redirect.entity';
import { User } from '../user/user.entity';
import { REDIRECT_REPOSITORY } from './redirect.constants';
import { Repository } from 'typeorm';
import { USER_REPOSITORY } from '../user/user.constants';

@Injectable()
export class RedirectService {
  constructor(
    @Inject(REDIRECT_REPOSITORY)
    private redirectRepository: Repository<Redirect>,
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}
  async getUrlById(id: string) {
    const redirect = await this.redirectRepository.findOneBy({ id });

    if (!redirect) throw new NotFoundException();

    redirect.useCount++;

    await this.redirectRepository.save(redirect);

    return redirect.url;
  }
  async create(user: User, redirect: Redirect) {
    user.addRedirect(redirect);

    await this.userRepository.save(user);

    return redirect;
  }
}
