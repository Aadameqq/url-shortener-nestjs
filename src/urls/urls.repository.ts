import { Injectable } from '@nestjs/common';
import { Url } from './url.entity';
import { InjectModel } from '@nestjs/mongoose';
import { toObjectId } from '../common/toObjectId';

@Injectable()
export class UrlsRepository {
  constructor(@InjectModel(Url.name) private urlModel) {}

  async readById(id: string): Promise<Url | null> {
    const objectId = toObjectId(id);

    if (!objectId) return null;

    return await this.urlModel.findOne({
      _id: objectId,
    });
  }
  async create(urlObject: Url) {
    await new this.urlModel(urlObject).save();
  }
  async incrementUseCountById(id: string) {
    const objectId = toObjectId(id);

    if (!objectId) return null;

    await this.urlModel.findOneAndUpdate(
      { _id: objectId },
      { $inc: { useCount: 1 } },
    );
  }
  async readAllByOwnerId(ownerId: string) {
    const foundUrlObjects = await this.urlModel.find({ ownerId });

    return foundUrlObjects.map(
      (urlObject) =>
        new Url(urlObject._id, urlObject.url, ownerId, urlObject.useCount),
    );
  }
}
