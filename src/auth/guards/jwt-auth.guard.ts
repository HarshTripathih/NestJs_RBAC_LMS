import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid Authorization format');
    }

    try {
      const decoded = this.jwtService.verify(token);

      console.log('DECODED PAYLOAD:', decoded);

      // ⭐⭐⭐ IMPORTANT — ADD THIS ⭐⭐⭐
      request.user = decoded;

      return true;
    } catch (error) {
      console.error('JWT VERIFY ERROR:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
