// src/core/domain/entities/user.entity.ts
export class UserEntity {
  id?: string | number;
  fname: string;
  lname: string;
  email: string;
  password: string;
  roles?: string[] = [];
  isActive?: boolean;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
