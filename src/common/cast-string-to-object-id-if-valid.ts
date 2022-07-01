import { ObjectId } from 'mongodb';

export const castStringToObjectIdIfValid = (str: string): ObjectId | false => {
  try {
    return new ObjectId(str);
  } catch (err) {
    return false;
  }
};
