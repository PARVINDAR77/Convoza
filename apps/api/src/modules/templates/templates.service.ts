import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTemplateDto, UpdateTemplateDto } from './dto/template.dto';
import { validateTemplateName, validateTemplateComponents } from '@convoza/validation';
import { decryptSecret, META_CONFIG } from '@convoza/configuration';
import { TemplateStatus, TemplateCategory } from '@convoza/shared-types';

@Injectable()
export class TemplatesService {
  private readonly logger = new Logger(TemplatesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getTemplates(
    organizationId: string,
    query: {
      page?: number;
      limit?: number;
      search?: string;
      category?: string;
      status?: string;
      whatsappAccountId?: string;
    }
  ) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
    const skip = (page - 1) * limit;

    const where: any = { organizationId };

    if (query.whatsappAccountId) {
      where.whatsappAccountId = query.whatsappAccountId;
    }

    if (query.category) {
      where.category = query.category as TemplateCategory;
    }

    if (query.status) {
      where.status = query.status as TemplateStatus;
    }

    if (query.search) {
      where.name = { contains: query.search.toLowerCase() };
    }

    const [total, items] = await Promise.all([
      this.prisma.template.count({ where }),
      this.prisma.template.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          whatsappAccount: {
            select: {
              id: true,
              name: true,
              wabaId: true,
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

  async getTemplateById(organizationId: string, id: string) {
    const template = await this.prisma.template.findFirst({
      where: { id, organizationId },
      include: {
        whatsappAccount: {
          select: {
            id: true,
            name: true,
            wabaId: true,
          },
        },
      },
    });

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    return template;
  }

  async createTemplate(organizationId: string, dto: CreateTemplateDto) {
    // 1. Validate template name
    const nameValidation = validateTemplateName(dto.name);
    if (!nameValidation.isValid) {
      throw new BadRequestException(nameValidation.errors.join(', '));
    }

    // 2. Validate template components
    const componentsValidation = validateTemplateComponents(dto.components);
    if (!componentsValidation.isValid) {
      throw new BadRequestException(componentsValidation.errors.join(', '));
    }

    // 3. Verify WhatsApp account exists and belongs to organization
    const account = await this.prisma.whatsAppAccount.findFirst({
      where: { id: dto.whatsappAccountId, organizationId },
    });

    if (!account) {
      throw new NotFoundException('WhatsApp account not found in this organization');
    }

    // 4. Check for duplicate template name in this language
    const existing = await this.prisma.template.findFirst({
      where: {
        organizationId,
        name: nameValidation.data!,
        language: dto.language || 'en_US',
      },
    });

    if (existing) {
      throw new ConflictException(
        `Template with name "${nameValidation.data}" and language "${dto.language}" already exists`
      );
    }

    return this.prisma.template.create({
      data: {
        organizationId,
        whatsappAccountId: dto.whatsappAccountId,
        name: nameValidation.data!,
        language: dto.language || 'en_US',
        category: dto.category,
        status: TemplateStatus.DRAFT,
        components: dto.components as any,
      },
    });
  }

  async updateTemplate(organizationId: string, id: string, dto: UpdateTemplateDto) {
    const template = await this.prisma.template.findFirst({
      where: { id, organizationId },
    });

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    if (template.status === TemplateStatus.APPROVED || template.status === TemplateStatus.PENDING) {
      throw new BadRequestException('Cannot edit a template that is already pending or approved by Meta');
    }

    if (dto.components) {
      const compValidation = validateTemplateComponents(dto.components);
      if (!compValidation.isValid) {
        throw new BadRequestException(compValidation.errors.join(', '));
      }
    }

    return this.prisma.template.update({
      where: { id },
      data: {
        ...(dto.category && { category: dto.category }),
        ...(dto.components && { components: dto.components as any }),
        status: TemplateStatus.DRAFT,
      },
    });
  }

  async deleteTemplate(organizationId: string, id: string) {
    const template = await this.prisma.template.findFirst({
      where: { id, organizationId },
    });

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    await this.prisma.template.delete({
      where: { id },
    });

    return { success: true, message: 'Template deleted' };
  }

  /**
   * Submit template to Meta Cloud API for official approval
   */
  async submitToMeta(organizationId: string, id: string) {
    const template = await this.prisma.template.findFirst({
      where: { id, organizationId },
      include: {
        whatsappAccount: {
          include: { credentials: true },
        },
      },
    });

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    if (!template.whatsappAccount.credentials) {
      throw new BadRequestException('WhatsApp account credentials missing');
    }

    const decryptedToken = decryptSecret(template.whatsappAccount.credentials.encryptedToken);

    try {
      // Format payload according to Meta WhatsApp Business API specification
      const metaPayload = {
        name: template.name,
        category: template.category,
        language: template.language,
        components: template.components,
      };

      const res = await axios.post(
        `${META_CONFIG.GRAPH_API_BASE}/${template.whatsappAccount.wabaId}/message_templates`,
        metaPayload,
        {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
            'Content-Type': 'application/json',
          },
          timeout: 12000,
        }
      );

      const metaTemplateId = res.data?.id;
      const metaStatus = res.data?.status || 'PENDING';

      const updated = await this.prisma.template.update({
        where: { id },
        data: {
          metaTemplateId,
          status: this.mapMetaStatus(metaStatus),
        },
      });

      return {
        success: true,
        template: updated,
        metaResponse: res.data,
      };
    } catch (err: any) {
      const errorMsg = err.response?.data?.error?.message || err.message;
      this.logger.error(`Meta template submission failed: ${errorMsg}`);
      
      // Update template with rejection details if rejected immediately
      await this.prisma.template.update({
        where: { id },
        data: {
          status: TemplateStatus.REJECTED,
          rejectionReason: errorMsg,
        },
      });

      throw new BadRequestException(`Meta template submission error: ${errorMsg}`);
    }
  }

  /**
   * Sync all templates under the WABA from Meta Cloud API
   */
  async syncTemplates(organizationId: string, whatsappAccountId: string) {
    const account = await this.prisma.whatsAppAccount.findFirst({
      where: { id: whatsappAccountId, organizationId },
      include: { credentials: true },
    });

    if (!account || !account.credentials) {
      throw new BadRequestException('Valid WhatsApp account and credentials required');
    }

    const decryptedToken = decryptSecret(account.credentials.encryptedToken);

    try {
      const res = await axios.get(
        `${META_CONFIG.GRAPH_API_BASE}/${account.wabaId}/message_templates`,
        {
          headers: { Authorization: `Bearer ${decryptedToken}` },
          params: { limit: 100 },
          timeout: 15000,
        }
      );

      const metaTemplates = res.data?.data || [];
      const updatedList = [];

      for (const mt of metaTemplates) {
        const localStatus = this.mapMetaStatus(mt.status);
        const mappedCategory = this.mapMetaCategory(mt.category);

        const upserted = await this.prisma.template.upsert({
          where: {
            organizationId_name_language: {
              organizationId,
              name: mt.name,
              language: mt.language,
            },
          },
          create: {
            organizationId,
            whatsappAccountId: account.id,
            name: mt.name,
            language: mt.language,
            category: mappedCategory,
            status: localStatus,
            metaTemplateId: mt.id,
            components: mt.components || [],
            rejectionReason: mt.rejected_reason || null,
          },
          update: {
            status: localStatus,
            metaTemplateId: mt.id,
            components: mt.components || [],
            rejectionReason: mt.rejected_reason || null,
          },
        });
        updatedList.push(upserted);
      }

      return {
        syncedCount: updatedList.length,
        templates: updatedList,
      };
    } catch (err: any) {
      throw new BadRequestException(`Failed to sync templates from Meta: ${err.message}`);
    }
  }

  private mapMetaStatus(status?: string): TemplateStatus {
    switch (status?.toUpperCase()) {
      case 'APPROVED':
        return TemplateStatus.APPROVED;
      case 'REJECTED':
        return TemplateStatus.REJECTED;
      case 'PENDING':
        return TemplateStatus.PENDING;
      case 'PAUSED':
        return TemplateStatus.PAUSED;
      case 'DISABLED':
        return TemplateStatus.DISABLED;
      default:
        return TemplateStatus.PENDING;
    }
  }

  private mapMetaCategory(category?: string): TemplateCategory {
    switch (category?.toUpperCase()) {
      case 'UTILITY':
        return TemplateCategory.UTILITY;
      case 'AUTHENTICATION':
        return TemplateCategory.AUTHENTICATION;
      case 'MARKETING':
      default:
        return TemplateCategory.MARKETING;
    }
  }
}

