import { CourseEntity } from "../entities/course.entity";

// src/core/domain/repository/course.repository.interface.ts
export abstract class CourseRepositoryInterface {
  abstract create(course: CourseEntity): Promise<CourseEntity | null>;
  abstract findAll(): Promise<CourseEntity[] | null>;
  abstract findById(id: string): Promise<CourseEntity | null>;
  abstract update(
    id: string,
    data: Partial<CourseEntity>,
  ): Promise<CourseEntity | null>;
  abstract delete(id: string): Promise<boolean>;
}


