import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@convoza/shared-types';
import { ROLES_KEY } from '../guards/roles.guard';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

export const CurrentOrg = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.organization;
});

export const CurrentMembership = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.membership;
});

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

