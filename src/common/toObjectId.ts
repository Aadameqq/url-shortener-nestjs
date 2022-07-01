import { ObjectId } from 'mongodb';

export const toObjectId = (str: string): ObjectId | false => {
  try {
    return new ObjectId(str);
  } catch (err) {
    return false;
  }
};
