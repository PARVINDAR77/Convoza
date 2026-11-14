import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrganizationDto, UpdateOrganizationDto, InviteMemberDto } from './dto/organization.dto';
import { UserRole, BillingPlanTier, SubscriptionStatus } from '@convoza/shared-types';

@Injectable()
export class OrganizationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserOrganizations(userId: string) {
    const memberships = await this.prisma.membership.findMany({
      where: { userId, isActive: true },
      include: {
        organization: {
          include: {
            subscription: {
              include: { plan: true },
            },
            phoneNumbers: {
              select: {
                id: true,
                displayPhoneNumber: true,
                verifiedName: true,
                qualityRating: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return memberships.map((m) => ({
      membershipId: m.id,
      role: m.role,
      organization: m.organization,
    }));
  }

  async createOrganization(userId: string, dto: CreateOrganizationDto) {
    const baseSlug = dto.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'org';
    const randomSuffix = crypto.randomBytes(3).toString('hex');
    const slug = `${baseSlug}-${randomSuffix}`;

    const starterPlan = await this.prisma.plan.findFirst({
      where: { tier: BillingPlanTier.STARTER },
    });

    return this.prisma.$transaction(async (tx) => {
      const organization = await tx.organization.create({
        data: {
          name: dto.name.trim(),
          slug,
        },
      });

      const membership = await tx.membership.create({
        data: {
          userId,
          organizationId: organization.id,
          role: UserRole.ORG_OWNER,
        },
      });

      const currentPeriodEnd = new Date();
      currentPeriodEnd.setDate(currentPeriodEnd.getDate() + 14);

      if (starterPlan) {
        await tx.subscription.create({
          data: {
            organizationId: organization.id,
            planId: starterPlan.id,
            status: SubscriptionStatus.TRIALING,
            currentPeriodEnd,
          },
        });
      }

      return { organization, membership };
    });
  }

  async getOrganization(organizationId: string) {
    const org = await this.prisma.organization.findUnique({
      where: { id: organizationId },
      include: {
        subscription: {
          include: { plan: true },
        },
        phoneNumbers: true,
        whatsAppAccounts: true,
      },
    });

    if (!org) {
      throw new NotFoundException('Organization not found');
    }

    return org;
  }

  async updateOrganization(organizationId: string, dto: UpdateOrganizationDto) {
    return this.prisma.organization.update({
      where: { id: organizationId },
      data: {
        ...(dto.name && { name: dto.name.trim() }),
        ...(dto.logoUrl && { logoUrl: dto.logoUrl }),
      },
    });
  }

  async getMembers(organizationId: string) {
    const members = await this.prisma.membership.findMany({
      where: { organizationId, isActive: true },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    const invitations = await this.prisma.invitation.findMany({
      where: {
        organizationId,
        acceptedAt: null,
        expiresAt: { gt: new Date() },
      },
    });

    return {
      members: members.map((m) => ({
        id: m.id,
        userId: m.userId,
        role: m.role,
        createdAt: m.createdAt,
        user: m.user,
      })),
      invitations,
    };
  }

  async inviteMember(organizationId: string, dto: InviteMemberDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase().trim() },
    });

    if (existingUser) {
      const existingMember = await this.prisma.membership.findUnique({
        where: {
          organizationId_userId: {
            organizationId,
            userId: existingUser.id,
          },
        },
      });

      if (existingMember && existingMember.isActive) {
        throw new ConflictException('User is already an active member of this organization');
      }
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiration

    return this.prisma.invitation.create({
      data: {
        organizationId,
        email: dto.email.toLowerCase().trim(),
        role: dto.role,
        token,
        expiresAt,
      },
    });
  }

  async removeMember(organizationId: string, memberId: string) {
    const membership = await this.prisma.membership.findUnique({
      where: { id: memberId },
    });

    if (!membership || membership.organizationId !== organizationId) {
      throw new NotFoundException('Member not found');
    }

    if (membership.role === UserRole.ORG_OWNER) {
      throw new ForbiddenException('Cannot remove the organization owner');
    }

    return this.prisma.membership.delete({
      where: { id: memberId },
    });
  }
}

