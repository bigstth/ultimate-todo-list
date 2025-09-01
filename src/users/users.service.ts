import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { User } from './entities/user.entity';
import bcrypt from 'bcrypt';
import type { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}
  async findUserByUsername(username: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ username }).exec();
    return user ?? undefined;
  }

  async createUser(payload: CreateUserDto): Promise<User | undefined> {
    const existing = await this.userModel
      .findOne({ username: payload.username })
      .exec();

    if (existing) throw new ConflictException('Username already exists');
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const user = await this.userModel.create({
      username: payload.username,
      password: hashedPassword,
    });
    return user;
  }
}
