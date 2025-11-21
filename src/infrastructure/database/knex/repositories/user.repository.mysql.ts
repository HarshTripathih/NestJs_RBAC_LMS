import { Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from 'src/core/domain/repositories/user.repository.interface';
import { UserEntity } from 'src/core/domain/entities/user.entity';
import { KnexService } from '../knex.service';

export class KnexMySQLUserRepository implements UserRepositoryInterface {
  constructor(private readonly knex: KnexService) {}

  private readonly table = 'users';

  async findByEmail(email: string) {
    const user = await this.knex.table(this.table).where({ email }).first();
    return user ? new UserEntity(user) : null;
  }

  async findById(id: string) {
    const user = await this.knex.table(this.table).where({ id }).first();
    return user ? new UserEntity(user) : null;
  }

  async create(data: Partial<UserEntity>) {
    const [id] = await this.knex.table(this.table).insert(data);
    const row = await this.knex.table(this.table).where({ id }).first();
    return new UserEntity(row);
  }
}
