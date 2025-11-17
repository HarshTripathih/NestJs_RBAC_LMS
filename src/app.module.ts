import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    // MUST be first
    ConfigModule.forRoot({ isGlobal: true }),

    // now other modules can safely use env variables
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    AuthModule,
    UserModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
