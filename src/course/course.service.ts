import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto, instructorId: string) {
    const course = await this.courseModel.create({
      ...createCourseDto,
      instructor: instructorId,
    });

    return {
      message: 'Course created successfully',
      course,
    };
  }

  async findAll() {
    return this.courseModel
      .find()
      .populate('instructor', 'fname lname email roles');
  }
}
