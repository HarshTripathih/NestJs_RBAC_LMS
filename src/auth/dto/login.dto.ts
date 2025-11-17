import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Role } from 'src/constants/roles';


export class LoginDto {
@IsEmail()
@IsNotEmpty()
email: string;

@IsNotEmpty()
password: string;

@IsOptional()
  @IsEnum(Role, { message: 'Invalid role selection' })
  role?: Role;   // optional login role
}