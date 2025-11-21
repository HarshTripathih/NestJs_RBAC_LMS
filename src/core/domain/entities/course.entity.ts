// src/core/domain/entities/course.entity.ts

export class CourseEntity {
  id?: string | number;
  title: string;
  description: string;
  instructor: string;   // Keep as string, no ObjectId leakage into domain
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(partial: Partial<CourseEntity>) {
    Object.assign(this, partial);
  }
}
