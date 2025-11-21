import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
constructor(
    private readonly userService: UserService, 
    private jwtService: JwtService,
) {}


async validateUser(loginDto: LoginDto) {
  const user = await this.userService.findByEmail(loginDto.email);
  if (!user) return null;

  const valid = await this.userService.validatePassword(loginDto.password, user.password);
  if (!valid) return null;

  // Role check: If user selected a role → verify user's real roles include it
  if (loginDto.role && !(user.roles ?? []).includes(loginDto.role)) {
    throw new UnauthorizedException(
      `You are not allowed to login as ${loginDto.role}`
    );
  }

  const { password, ...result } = user as any;
  return result;
}



async login(user: any) {
    const payload = { sub: user._id, email: user.email, roles: user.roles };
    console.log('JWT Payload:', payload);
    const token = {
        access_token: this.jwtService.sign(payload),
        expires_in: process.env.JWT_EXPIRES_IN || '1h',
    };
    console.log('Login Response:', token);
    return token;
}


async register(registerDto: RegisterDto) {
    const user = await this.userService.create(registerDto);
    return this.login(user);
    // return user;
    }
}