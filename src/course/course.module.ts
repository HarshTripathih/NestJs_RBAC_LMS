import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './schemas/course.schema';
import { JwtAuthModule } from 'src/auth/jwt.module';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name:'Course', schema: CourseSchema
    }]),
    JwtAuthModule
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
