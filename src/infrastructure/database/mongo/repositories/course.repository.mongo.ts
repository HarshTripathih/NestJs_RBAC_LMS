// src/infrastructure/database/repositories/course.repository.mongo.ts

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Course } from "../schemas/course.schema";
import { CourseRepositoryInterface } from "src/core/domain/repositories/course.repository.interface";
import { CourseEntity } from "src/core/domain/entities/course.entity";

export class CourseRepositoryMongo implements CourseRepositoryInterface {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<Course> ) {}

  private toDomain(course: any): CourseEntity {
    // if (!course) return null;
    return new CourseEntity({
      id: course._id.toString(),
      title: course.title,
      description: course.description,
      instructor: course.instructor?.toString(),
      isActive: course.isActive,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    });
  }

  async create(course: CourseEntity): Promise<CourseEntity> {
    const created = await this.courseModel.create({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      isActive: course.isActive ?? true,
    });

    return this.toDomain(created);
  }

  async findAll(): Promise<CourseEntity[]> {
    const courses = await this.courseModel
      .find()
      .populate("instructor", "fname lname email roles");

    return courses.map((course) => this.toDomain(course));
  }

  async findById(id: string): Promise<CourseEntity | null> {
    const course = await this.courseModel.findById(id);
    return this.toDomain(course);
  }

  async update(
    id: string,
    data: Partial<CourseEntity>,
  ): Promise<CourseEntity | null> {
    const updated = await this.courseModel.findByIdAndUpdate(
      id,
      data,
      { new: true },
    );

    return this.toDomain(updated);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.courseModel.findByIdAndDelete(id);
    return !!result;
  }
}
