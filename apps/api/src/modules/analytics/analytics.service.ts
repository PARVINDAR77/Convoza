import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  MessageStatus,
  MessageDirection,
  CampaignStatus,
} from '@convoza/shared-types';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardMetrics(organizationId: string) {
    const [
      totalMessages,
      sentCount,
      deliveredCount,
      readCount,
      failedCount,
      inboundCount,
      activeCampaigns,
      totalContacts,
      connectedNumbers,
    ] = await Promise.all([
      this.prisma.message.count({ where: { organizationId } }),
      this.prisma.message.count({
        where: { organizationId, status: { in: [MessageStatus.SENT, MessageStatus.DELIVERED, MessageStatus.READ] } },
      }),
      this.prisma.message.count({
        where: { organizationId, status: { in: [MessageStatus.DELIVERED, MessageStatus.READ] } },
      }),
      this.prisma.message.count({ where: { organizationId, status: MessageStatus.READ } }),
      this.prisma.message.count({ where: { organizationId, status: MessageStatus.FAILED } }),
      this.prisma.message.count({
        where: { organizationId, direction: MessageDirection.INBOUND },
      }),
      this.prisma.campaign.count({
        where: { organizationId, status: CampaignStatus.PROCESSING },
      }),
      this.prisma.contact.count({ where: { organizationId } }),
      this.prisma.phoneNumber.count({ where: { organizationId } }),
    ]);

    const deliveryRate = sentCount > 0 ? Math.round((deliveredCount / sentCount) * 100) : 0;
    const readRate = deliveredCount > 0 ? Math.round((readCount / deliveredCount) * 100) : 0;
    const replyRate = deliveredCount > 0 ? Math.round((inboundCount / deliveredCount) * 100) : 0;

    return {
      totalMessages,
      sentCount,
      deliveredCount,
      readCount,
      failedCount,
      replyCount: inboundCount,
      activeCampaigns,
      totalContacts,
      connectedNumbers,
      rates: {
        deliveryRate,
        readRate,
        replyRate,
      },
    };
  }

  async getTimeseries(organizationId: string, days = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const messages = await this.prisma.message.findMany({
      where: {
        organizationId,
        createdAt: { gte: startDate },
      },
      select: {
        id: true,
        status: true,
        direction: true,
        createdAt: true,
      },
    });

    // Group by day
    const dayMap = new Map<string, { date: string; sent: number; delivered: number; read: number; failed: number; inbound: number }>();

    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - (days - 1 - i));
      const key = d.toISOString().split('T')[0];
      dayMap.set(key, { date: key, sent: 0, delivered: 0, read: 0, failed: 0, inbound: 0 });
    }

    for (const msg of messages) {
      const key = msg.createdAt.toISOString().split('T')[0];
      const entry = dayMap.get(key);
      if (entry) {
        if (msg.direction === MessageDirection.INBOUND) {
          entry.inbound++;
        } else {
          entry.sent++;
          if (msg.status === MessageStatus.DELIVERED || msg.status === MessageStatus.READ) {
            entry.delivered++;
          }
          if (msg.status === MessageStatus.READ) {
            entry.read++;
          }
          if (msg.status === MessageStatus.FAILED) {
            entry.failed++;
          }
        }
      }
    }

    return Array.from(dayMap.values());
  }

  async getCampaignsPerformance(organizationId: string) {
    return this.prisma.campaign.findMany({
      where: { organizationId },
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        status: true,
        totalRecipients: true,
        sentCount: true,
        deliveredCount: true,
        readCount: true,
        failedCount: true,
        repliedCount: true,
        createdAt: true,
      },
    });
  }
}
