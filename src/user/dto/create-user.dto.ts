import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsArray, IsString, IsEnum } from 'class-validator';
import { Role } from 'src/constants/roles';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fname: string;

  @IsString()
  @IsNotEmpty()
  lname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsArray()
  @IsEnum(Role, { each: true })
  roles?: Role[];
}
