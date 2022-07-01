import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel) {}

  async findByUsername(username: string): Promise<User | false> {
    const foundUser = await this.userModel.findOne({ username });

    return foundUser
      ? new User(foundUser.id, foundUser.username, foundUser.password)
      : false;
  }
  async create(user: User): Promise<User> {
    await new this.userModel(user).save();

    return user;
  }
}
