import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepositoryInterface } from 'src/core/domain/repositories/user.repository.interface';
import { User, UserDocument } from 'src/infrastructure/database/mongo/schemas/user.schema';
import { UserEntity } from 'src/core/domain/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongoUserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async findByEmail(email: string) {
    const user = await this.model.findOne({ email }).lean();
    return user ? new UserEntity(user) : null;
  }

  async findById(id: string) {
    const user = await this.model.findById(id).lean();
    return user ? new UserEntity(user) : null;
  }

  async create(data: Partial<UserEntity>) {
    const created = await this.model.create(data);
    return new UserEntity(created.toObject());
  }
}

