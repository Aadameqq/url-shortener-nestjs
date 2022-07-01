import { Injectable, NotFoundException } from '@nestjs/common';
import { UrlsRepository } from './urls.repository';
import { Url } from './url.entity';

@Injectable()
export class UrlsService {
  constructor(private urlsRepository: UrlsRepository) {}
  async getUrlById(id: string) {
    const urlObject = await this.urlsRepository.readById(id);

    if (!urlObject) throw new NotFoundException();

    await this.urlsRepository.incrementUseCountById(id);

    return urlObject.url;
  }
  async create(urlObject: Url) {
    await this.urlsRepository.create(urlObject);
  }
  async readAllByOwnerId(ownerId: string) {
    return await this.urlsRepository.readAllByOwnerId(ownerId);
  }
}
