import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@convoza/shared-types';

export const ROLES_KEY = 'roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const membership = request.membership;

    if (!user) {
      return false;
    }

    if (user.isSuperAdmin) {
      return true;
    }

    if (!membership) {
      throw new ForbiddenException('Membership context missing for role verification');
    }

    // Role hierarchy checking
    const roleHierarchy: Record<UserRole, number> = {
      [UserRole.SUPER_ADMIN]: 100,
      [UserRole.ORG_OWNER]: 80,
      [UserRole.ORG_ADMIN]: 60,
      [UserRole.MANAGER]: 40,
      [UserRole.AGENT]: 20,
      [UserRole.VIEWER]: 10,
    };

    const userLevel = roleHierarchy[membership.role as UserRole] || 0;
    const hasRole = requiredRoles.some((role) => userLevel >= (roleHierarchy[role] || 0));

    if (!hasRole) {
      throw new ForbiddenException('Insufficient permissions to perform this action');
    }

    return true;
  }
}
