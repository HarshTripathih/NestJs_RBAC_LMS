import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseRepositoryInterface } from 'src/core/domain/repositories/course.repository.interface';

@Injectable()
export class CourseService {
  
  constructor(private readonly courseRepo: CourseRepositoryInterface,) {}

  async create(createCourseDto: CreateCourseDto, instructorId: string) {
    const course = await this.courseRepo.create({
      ...createCourseDto,
      instructor: instructorId,
    });

    return {
      message: 'Course created successfully',
      course,
    };
  }

  async findAll() {
    return this.courseRepo
      .findAll()
  }
}
