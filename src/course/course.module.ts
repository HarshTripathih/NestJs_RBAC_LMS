import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { JwtAuthModule } from 'src/auth/jwt.module';
import { DBModule } from 'src/infrastructure/database/db.module';

@Module({
  imports:[
    DBModule,
    JwtAuthModule
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
