import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // CREATE COURSE → only instructor or admin
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('instructor', 'admin')
  @Post('create')
  async create(@Body() createCourseDto: CreateCourseDto, @Req() req) {
    console.log("req user id : ",req.user.sub);
    return this.courseService.create(createCourseDto, req.user.sub);
  }

  // GET ALL COURSES → all logged in users (students + instructors + admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('student', 'instructor', 'admin')
  @Get()
  async getAll() {
    return this.courseService.findAll();
  }
}
