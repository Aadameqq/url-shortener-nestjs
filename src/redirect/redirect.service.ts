import { Injectable, NotFoundException } from '@nestjs/common';
import { RedirectRepository } from './redirect.repository';
import { Redirect } from './redirect.entity';

@Injectable()
export class RedirectService {
  constructor(private redirectRepository: RedirectRepository) {}
  async getUrlById(id: string) {
    const redirect = await this.redirectRepository.readById(id);

    if (!redirect) throw new NotFoundException();

    await this.redirectRepository.incrementUseCountById(id);

    return redirect.url;
  }
  async create(redirect: Redirect) {
    return await this.redirectRepository.create(redirect);
  }
  async readAllByOwnerId(ownerId: string) {
    return await this.redirectRepository.readAllByOwnerId(ownerId);
  }
}
