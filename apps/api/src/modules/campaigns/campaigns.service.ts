import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCampaignDto, UpdateCampaignDto } from './dto/campaign.dto';
import {
  CampaignStatus,
  CampaignRecipientStatus,
  TemplateStatus,
  ConsentStatus,
  JobType,
  JobStatus,
} from '@convoza/shared-types';

@Injectable()
export class CampaignsService {
  private readonly logger = new Logger(CampaignsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getCampaigns(
    organizationId: string,
    query: { page?: number; limit?: number; status?: string; search?: string }
  ) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
    const skip = (page - 1) * limit;

    const where: any = { organizationId };

    if (query.status) {
      where.status = query.status as CampaignStatus;
    }

    if (query.search) {
      where.name = { contains: query.search.trim(), mode: 'insensitive' };
    }

    const [total, items] = await Promise.all([
      this.prisma.campaign.count({ where }),
      this.prisma.campaign.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          template: { select: { id: true, name: true, category: true, language: true } },
          phoneNumber: { select: { id: true, displayPhoneNumber: true, verifiedName: true } },
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

  async getCampaignById(organizationId: string, id: string) {
    const campaign = await this.prisma.campaign.findFirst({
      where: { id, organizationId },
      include: {
        template: true,
        phoneNumber: true,
        recipients: {
          take: 50,
          include: {
            contact: { select: { id: true, phone: true, name: true, email: true } },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    return campaign;
  }

  async createCampaign(organizationId: string, dto: CreateCampaignDto) {
    // 1. Verify phone number
    const phone = await this.prisma.phoneNumber.findFirst({
      where: { phoneNumberId: dto.phoneNumberId, organizationId },
    });
    if (!phone) {
      throw new NotFoundException('Sending phone number not found');
    }

    // 2. Verify template
    const template = await this.prisma.template.findFirst({
      where: { id: dto.templateId, organizationId },
    });
    if (!template) {
      throw new NotFoundException('Template not found');
    }
    if (template.status !== TemplateStatus.APPROVED) {
      throw new BadRequestException('Only approved templates can be used for bulk campaigns');
    }

    // 3. Resolve eligible audience
    const audience = await this.resolveAudience(organizationId, dto.contactListId, dto.tagIds);

    const initialStatus = dto.scheduledAt && new Date(dto.scheduledAt) > new Date()
      ? CampaignStatus.SCHEDULED
      : CampaignStatus.DRAFT;

    return this.prisma.$transaction(async (tx) => {
      const campaign = await tx.campaign.create({
        data: {
          organizationId,
          phoneNumberId: dto.phoneNumberId,
          templateId: dto.templateId,
          name: dto.name.trim(),
          status: initialStatus,
          scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : null,
          totalRecipients: audience.eligible.length,
          queuedCount: audience.eligible.length,
          variableMapping: (dto.variableMapping as any) || {},
        },
      });

      // Populate campaign recipients
      if (audience.eligible.length > 0) {
        const recipientData = audience.eligible.map((c) => ({
          campaignId: campaign.id,
          contactId: c.id,
          status: CampaignRecipientStatus.QUEUED,
        }));

        // Insert in batches of 1000
        for (let i = 0; i < recipientData.length; i += 1000) {
          const slice = recipientData.slice(i, i + 1000);
          await tx.campaignRecipient.createMany({
            data: slice,
            skipDuplicates: true,
          });
        }
      }

      return campaign;
    });
  }

  async estimateCampaign(organizationId: string, id: string) {
    const campaign = await this.prisma.campaign.findFirst({
      where: { id, organizationId },
      include: { template: true },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    const totalContacts = await this.prisma.contact.count({ where: { organizationId } });
    const optedIn = await this.prisma.contact.count({
      where: { organizationId, consentStatus: ConsentStatus.OPTED_IN },
    });
    const optedOut = await this.prisma.contact.count({
      where: { organizationId, consentStatus: ConsentStatus.OPTED_OUT },
    });

    return {
      campaignId: campaign.id,
      totalAudience: totalContacts,
      eligibleRecipients: optedIn,
      suppressedRecipients: optedOut,
      estimatedDeliveryTimeMinutes: Math.ceil(optedIn / (50 * 60)), // 50 msg/sec
      templateCategory: campaign.template.category,
    };
  }

  async startCampaign(organizationId: string, id: string) {
    const campaign = await this.prisma.campaign.findFirst({
      where: { id, organizationId },
      include: { template: true },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    if (campaign.status === CampaignStatus.PROCESSING) {
      throw new BadRequestException('Campaign is already running');
    }

    if (campaign.status === CampaignStatus.COMPLETED) {
      throw new BadRequestException('Campaign has already completed');
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.campaign.update({
        where: { id },
        data: {
          status: CampaignStatus.PROCESSING,
          startedAt: new Date(),
        },
      });

      // Enqueue job to transactional outbox for worker to process in batches
      await tx.outboxEvent.create({
        data: {
          organizationId,
          type: JobType.PROCESS_CAMPAIGN_BATCH,
          payload: {
            campaignId: campaign.id,
            phoneNumberId: campaign.phoneNumberId,
            templateId: campaign.templateId,
            variableMapping: campaign.variableMapping,
          },
          status: JobStatus.PENDING,
          idempotencyKey: `campaign_start_${campaign.id}_${Date.now()}`,
        },
      });

      return updated;
    });
  }

  async pauseCampaign(organizationId: string, id: string) {
    const campaign = await this.prisma.campaign.findFirst({
      where: { id, organizationId },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    if (campaign.status !== CampaignStatus.PROCESSING) {
      throw new BadRequestException('Only actively processing campaigns can be paused');
    }

    return this.prisma.campaign.update({
      where: { id },
      data: { status: CampaignStatus.PAUSED },
    });
  }

  async resumeCampaign(organizationId: string, id: string) {
    const campaign = await this.prisma.campaign.findFirst({
      where: { id, organizationId },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    if (campaign.status !== CampaignStatus.PAUSED) {
      throw new BadRequestException('Only paused campaigns can be resumed');
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.campaign.update({
        where: { id },
        data: { status: CampaignStatus.PROCESSING },
      });

      await tx.outboxEvent.create({
        data: {
          organizationId,
          type: JobType.PROCESS_CAMPAIGN_BATCH,
          payload: { campaignId: campaign.id },
          status: JobStatus.PENDING,
        },
      });

      return updated;
    });
  }

  async cancelCampaign(organizationId: string, id: string) {
    const campaign = await this.prisma.campaign.findFirst({
      where: { id, organizationId },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    return this.prisma.campaign.update({
      where: { id },
      data: { status: CampaignStatus.CANCELLED },
    });
  }

  async getCampaignAnalytics(organizationId: string, id: string) {
    const campaign = await this.prisma.campaign.findFirst({
      where: { id, organizationId },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    const total = campaign.totalRecipients || 1;
    const sent = campaign.sentCount;
    const delivered = campaign.deliveredCount;
    const read = campaign.readCount;
    const failed = campaign.failedCount;
    const replied = campaign.repliedCount;

    return {
      campaignId: campaign.id,
      name: campaign.name,
      status: campaign.status,
      metrics: {
        totalRecipients: total,
        queued: campaign.queuedCount,
        sent,
        delivered,
        read,
        failed,
        replied,
        deliveryRate: Math.round((delivered / (sent || 1)) * 100),
        readRate: Math.round((read / (delivered || 1)) * 100),
        replyRate: Math.round((replied / (delivered || 1)) * 100),
      },
    };
  }

  private async resolveAudience(organizationId: string, listId?: string, tagIds?: string[]) {
    const where: any = {
      organizationId,
      consentStatus: ConsentStatus.OPTED_IN,
    };

    if (listId) {
      where.listMemberships = { some: { contactListId: listId } };
    }

    if (tagIds && tagIds.length > 0) {
      where.tags = { some: { tagId: { in: tagIds } } };
    }

    const eligible = await this.prisma.contact.findMany({
      where,
      select: { id: true, phone: true, name: true, customFields: true },
    });

    return { eligible };
  }
}

