import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  /**
   * canActivate() is automatically executed before the controller route handler.
   * It decides whether the incoming request is allowed to access the route.
   */
  canActivate(context: ExecutionContext): boolean {
    
    /**
     * 1️⃣ Get the required roles from the route using the @Roles() decorator.
     * 
     * reflector.getAllAndOverride() checks:
     *  - Handler level (method)
     *  - Controller level (class)
     */
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    /**
     * If no roles are required for this route → allow access.
     * Example: Public routes.
     */
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    /**
     * 2️⃣ Get the "user" object injected by JwtAuthGuard
     *    (JwtAuthGuard adds req.user after successful JWT validation)
     */
    const { user } = context.switchToHttp().getRequest();

    // If no user is found (means JWT failed or no auth) → deny access
    if (!user) return false;

    /**
     * 3️⃣ Check if the logged-in user has any of the required roles.
     * user.roles must be an array, e.g., ['admin', 'instructor']
     */
    return requiredRoles.some((role) => (user.roles || []).includes(role));
  }
}
