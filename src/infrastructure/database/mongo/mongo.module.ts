// src/infrastructure/database/mongo/mongo.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfig } from '../database.config';
import { MongoUserRepository } from './repositories/user.repository.mongo';
import { User, UserSchema } from './schemas/user.schema';
import { CourseRepositoryMongo } from './repositories/course.repository.mongo';
import { Course, CourseSchema } from './schemas/course.schema';

@Module({
  imports: [
    MongooseModule.forRoot(DatabaseConfig.mongo.uri || ''),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Course.name, schema: CourseSchema},
    ]),
  ],
  providers: [MongoUserRepository, CourseRepositoryMongo],
  exports: [
    MongoUserRepository,
    CourseRepositoryMongo,
    MongooseModule
  ],
})
export class MongoDBModule {}
