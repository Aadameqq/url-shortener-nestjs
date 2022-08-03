import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { toObjectId } from '../common/toObjectId';
import { Redirect } from './redirect.entity';

@Injectable()
export class RedirectRepository {
  constructor(@InjectModel(Redirect.name) private redirectModel) {}

  async readById(id: string): Promise<Redirect | null> {
    const objectId = toObjectId(id);

    if (!objectId) return null;

    return await this.redirectModel.findOne({
      _id: objectId,
    });
  }
  async create(redirect: Redirect): Promise<Redirect> {
    const newRedirect = await new this.redirectModel(redirect).save();
    return new Redirect(
      newRedirect._id,
      newRedirect.url,
      newRedirect.ownerId,
      newRedirect.useCount,
    );
  }
  async incrementUseCountById(id: string) {
    const objectId = toObjectId(id);

    if (!objectId) return null;

    await this.redirectModel.findOneAndUpdate(
      { _id: objectId },
      { $inc: { useCount: 1 } },
    );
  }
  async readAllByOwnerId(ownerId: string) {
    const foundRedirects = await this.redirectModel.find({ ownerId });

    return foundRedirects.map(
      (redirect) =>
        new Redirect(redirect._id, redirect.url, ownerId, redirect.useCount),
    );
  }
}
