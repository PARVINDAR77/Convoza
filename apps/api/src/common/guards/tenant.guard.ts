import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }

    // Super Admin can access with explicit header, or bypass if on platform routes
    const requestedOrgId =
      request.headers['x-organization-id'] ||
      request.query.organizationId ||
      request.body?.organizationId;

    if (user.isSuperAdmin && !requestedOrgId) {
      // Super admin without specific tenant scope
      return true;
    }

    // Look up memberships for this user
    const memberships = await this.prisma.membership.findMany({
      where: {
        userId: user.id,
        isActive: true,
      },
      include: {
        organization: true,
      },
    });

    if (!memberships || memberships.length === 0) {
      throw new ForbiddenException('User is not associated with any active organization');
    }

    let activeMembership = memberships[0];

    if (requestedOrgId) {
      const match = memberships.find((m) => m.organizationId === requestedOrgId);
      if (!match) {
        if (user.isSuperAdmin) {
          // Super admin explicitly selecting an organization
          const org = await this.prisma.organization.findUnique({
            where: { id: requestedOrgId },
          });
          if (org) {
            request.organization = org;
            request.membership = { role: 'SUPER_ADMIN', organizationId: org.id };
            return true;
          }
        }
        throw new ForbiddenException('Access denied: You do not have access to the requested organization');
      }
      activeMembership = match;
    }

    if (activeMembership.organization.isSuspended && !user.isSuperAdmin) {
      throw new ForbiddenException(
        `Organization is suspended: ${activeMembership.organization.suspensionReason || 'Contact support'}`
      );
    }

    // Attach validated organization and membership to request
    request.organization = activeMembership.organization;
    request.membership = activeMembership;
    return true;
  }
}

