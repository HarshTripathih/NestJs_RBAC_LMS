// src/core/domain/repositories/user.repository.interface.ts
import { UserEntity } from '../entities/user.entity';

export abstract class UserRepositoryInterface {
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract create(data: Partial<UserEntity>): Promise<UserEntity>;
}
