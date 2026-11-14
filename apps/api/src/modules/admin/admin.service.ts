import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SuspendOrganizationDto } from './dto/admin.dto';
import {
  MessageStatus,
  CampaignStatus,
  SubscriptionStatus,
  JobStatus,
} from '@convoza/shared-types';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getPlatformDashboard() {
    const [
      totalUsers,
      activeOrganizations,
      activeSubscriptions,
      connectedWhatsAppAccounts,
      connectedPhoneNumbers,
      totalMessagesSent,
      deliveredMessages,
      failedMessages,
      activeCampaigns,
      subscriptionsWithPlans,
      pendingJobs,
      processingJobs,
      failedJobs,
      deadLetterJobs,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.organization.count({ where: { isSuspended: false } }),
      this.prisma.subscription.count({ where: { status: SubscriptionStatus.ACTIVE } }),
      this.prisma.whatsAppAccount.count({ where: { status: 'CONNECTED' } }),
      this.prisma.phoneNumber.count(),
      this.prisma.message.count({ where: { direction: 'OUTBOUND' } }),
      this.prisma.message.count({
        where: { status: { in: [MessageStatus.DELIVERED, MessageStatus.READ] } },
      }),
      this.prisma.message.count({ where: { status: MessageStatus.FAILED } }),
      this.prisma.campaign.count({ where: { status: CampaignStatus.PROCESSING } }),
      this.prisma.subscription.findMany({
        where: { status: SubscriptionStatus.ACTIVE },
        include: { plan: true },
      }),
      this.prisma.outboxEvent.count({ where: { status: JobStatus.PENDING } }),
      this.prisma.outboxEvent.count({ where: { status: JobStatus.PROCESSING } }),
      this.prisma.outboxEvent.count({ where: { status: JobStatus.FAILED } }),
      this.prisma.outboxEvent.count({ where: { status: JobStatus.DEAD_LETTER } }),
    ]);

    // Calculate MRR in INR
    const mrrInr = subscriptionsWithPlans.reduce((sum, sub) => {
      if (sub.interval === 'YEARLY') {
        return sum + Math.round(sub.plan.priceYearly / 12);
      }
      return sum + sub.plan.priceMonthly;
    }, 0);

    return {
      totalUsers,
      activeOrganizations,
      activeSubscriptions,
      connectedWhatsAppAccounts,
      connectedPhoneNumbers,
      totalMessagesSent,
      deliveredMessages,
      failedMessages,
      activeCampaigns,
      mrrInr,
      queueHealth: {
        pendingJobs,
        processingJobs,
        failedJobs,
        deadLetterJobs,
      },
    };
  }

  async getOrganizations(query: { page?: number; limit?: number; search?: string }) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.search) {
      where.OR = [
        { name: { contains: query.search.trim(), mode: 'insensitive' } },
        { slug: { contains: query.search.trim(), mode: 'insensitive' } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.organization.count({ where }),
      this.prisma.organization.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          subscription: { include: { plan: true } },
          _count: {
            select: {
              memberships: true,
              phoneNumbers: true,
              messages: true,
              contacts: true,
            },
          },
        },
      }),
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async suspendOrganization(id: string, dto: SuspendOrganizationDto, adminUserId: string) {
    const org = await this.prisma.organization.findUnique({ where: { id } });
    if (!org) {
      throw new NotFoundException('Organization not found');
    }

    const updated = await this.prisma.organization.update({
      where: { id },
      data: {
        isSuspended: true,
        suspensionReason: dto.reason.trim(),
      },
    });

    await this.prisma.auditLog.create({
      data: {
        organizationId: id,
        userId: adminUserId,
        action: 'ORGANIZATION_SUSPENDED',
        resource: 'organization',
        resourceId: id,
        metadata: { reason: dto.reason },
      },
    });

    return updated;
  }

  async restoreOrganization(id: string, adminUserId: string) {
    const org = await this.prisma.organization.findUnique({ where: { id } });
    if (!org) {
      throw new NotFoundException('Organization not found');
    }

    const updated = await this.prisma.organization.update({
      where: { id },
      data: {
        isSuspended: false,
        suspensionReason: null,
      },
    });

    await this.prisma.auditLog.create({
      data: {
        organizationId: id,
        userId: adminUserId,
        action: 'ORGANIZATION_RESTORED',
        resource: 'organization',
        resourceId: id,
      },
    });

    return updated;
  }

  async getUsers(query: { page?: number; limit?: number; search?: string }) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.search) {
      where.OR = [
        { name: { contains: query.search.trim(), mode: 'insensitive' } },
        { email: { contains: query.search.trim(), mode: 'insensitive' } },
      ];
    }

    const [total, items] = await Promise.all([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          isSuperAdmin: true,
          isActive: true,
          createdAt: true,
          memberships: {
            include: {
              organization: { select: { id: true, name: true, slug: true } },
            },
          },
        },
      }),
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getAuditLogs(query: { page?: number; limit?: number }) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 30));
    const skip = (page - 1) * limit;

    const [total, items] = await Promise.all([
      this.prisma.auditLog.count(),
      this.prisma.auditLog.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, name: true, email: true } },
          organization: { select: { id: true, name: true } },
        },
      }),
    ]);

    return {
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

