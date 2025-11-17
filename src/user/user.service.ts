import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error as MongooseError } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Create a new user with proper validation, hashing & error handling
   */
  async create(registerDto: RegisterDto) {
    try {
      const { fname, lname, email, password, roles } = registerDto;

      // 1. Check if email exists
      const existing = await this.userModel.findOne({ email });
      if (existing) {
        throw new ConflictException('User with this email already exists.');
      }

      // 2. Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

        // Assign default role if no role provided
      const role = roles && roles.length > 0 ? roles : ['student'];

      // 3. Create user
      const newUser = await this.userModel.create({
        fname,
        lname,
        email,
        password: hashedPassword,
        roles: role,
      });

      return newUser;
    } catch (error) {
      console.error('Create User Error:', error);

      /** Handle MongoDB Duplicate Key Error */
      if (error instanceof MongooseError && (error as any).code === 11000) {
        throw new ConflictException('Email already exists.');
      }

      /** Validation Errors inside Mongo/Mongoose */
      if (error instanceof MongooseError.ValidationError) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while creating user.',
      );
    }
  }

  /**
   * Get user by email
   */
  async findByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email }).lean();
      if (!user) throw new NotFoundException('User not found.');
      return user;
    } catch (error) {
      console.error('FindByEmail Error:', error);
      throw error;
    }
  }

  /**
   * Get user by id
   */
  async findById(id: string) {
    try {
      const user = await this.userModel.findById(id).lean();
      if (!user) throw new NotFoundException('User not found.');
      return user;
    } catch (error) {
      console.error('FindById Error:', error);
      throw new BadRequestException('Invalid user ID.');
    }
  }

  /**
   * Validate password using bcrypt
   */
  async validatePassword(plain: string, hashed: string) {
    try {
      return bcrypt.compare(plain, hashed);
    } catch (error) {
      console.error('Password validation failed:', error);
      throw new InternalServerErrorException(
        'Error validating password, please try again.',
      );
    }
  }
}
