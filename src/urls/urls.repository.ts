import { Inject, Injectable } from '@nestjs/common';
import { Url } from './url.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CAST_STRING_TO_OBJECT_ID_IF_VALID_PROVIDER } from '../common/cast-string-to-object-id-if-valid-provider.constant';
import { castStringToObjectIdIfValid as castStringToObjectIdIfValidType } from '../common/cast-string-to-object-id-if-valid';

@Injectable()
export class UrlsRepository {
  constructor(
    @InjectModel(Url.name) private urlModel,
    @Inject(CAST_STRING_TO_OBJECT_ID_IF_VALID_PROVIDER)
    private castStringToObjectIdIfValid: typeof castStringToObjectIdIfValidType,
  ) {}

  async readById(id: string): Promise<Url | null> {
    const objectId = this.castStringToObjectIdIfValid(id);

    if (!objectId) return null;

    return await this.urlModel.findOne({
      _id: objectId,
    });
  }
  async create(urlObject: Url) {
    await new this.urlModel(urlObject).save();
  }
  async incrementUseCountById(id: string) {
    const objectId = this.castStringToObjectIdIfValid(id);

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
