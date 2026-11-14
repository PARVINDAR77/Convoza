import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAutomationDto, UpdateAutomationDto } from './dto/automation.dto';
import {
  AutomationTrigger,
  AutomationActionType,
  MessageDirection,
  MessageStatus,
  MessageType,
  JobType,
  JobStatus,
} from '@convoza/shared-types';

@Injectable()
export class AutomationsService {
  private readonly logger = new Logger(AutomationsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getAutomations(organizationId: string) {
    return this.prisma.automationRule.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { executions: true } },
      },
    });
  }

  async getAutomationById(organizationId: string, id: string) {
    const rule = await this.prisma.automationRule.findFirst({
      where: { id, organizationId },
      include: {
        executions: {
          take: 20,
          orderBy: { executedAt: 'desc' },
        },
      },
    });

    if (!rule) {
      throw new NotFoundException('Automation rule not found');
    }

    return rule;
  }

  async createAutomation(organizationId: string, dto: CreateAutomationDto) {
    return this.prisma.automationRule.create({
      data: {
        organizationId,
        name: dto.name.trim(),
        description: dto.description?.trim(),
        trigger: dto.trigger,
        conditions: dto.conditions as any,
        actions: dto.actions as any,
        isActive: dto.isActive !== undefined ? dto.isActive : true,
      },
    });
  }

  async updateAutomation(organizationId: string, id: string, dto: UpdateAutomationDto) {
    const rule = await this.prisma.automationRule.findFirst({
      where: { id, organizationId },
    });

    if (!rule) {
      throw new NotFoundException('Automation rule not found');
    }

    return this.prisma.automationRule.update({
      where: { id },
      data: {
        ...(dto.name && { name: dto.name.trim() }),
        ...(dto.description !== undefined && { description: dto.description?.trim() }),
        ...(dto.trigger && { trigger: dto.trigger }),
        ...(dto.conditions && { conditions: dto.conditions as any }),
        ...(dto.actions && { actions: dto.actions as any }),
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
      },
    });
  }

  async toggleActive(organizationId: string, id: string, isActive: boolean) {
    const rule = await this.prisma.automationRule.findFirst({
      where: { id, organizationId },
    });

    if (!rule) {
      throw new NotFoundException('Automation rule not found');
    }

    return this.prisma.automationRule.update({
      where: { id },
      data: { isActive },
    });
  }

  async deleteAutomation(organizationId: string, id: string) {
    const rule = await this.prisma.automationRule.findFirst({
      where: { id, organizationId },
    });

    if (!rule) {
      throw new NotFoundException('Automation rule not found');
    }

    await this.prisma.automationRule.delete({ where: { id } });
    return { success: true, message: 'Automation deleted successfully' };
  }

  /**
   * Evaluate automation rules against an event (e.g. incoming message)
   */
  async evaluateRules(
    organizationId: string,
    trigger: AutomationTrigger,
    context: {
      contactId: string;
      conversationId: string;
      phoneNumberId: string;
      messageText?: string;
    }
  ) {
    const activeRules = await this.prisma.automationRule.findMany({
      where: {
        organizationId,
        trigger,
        isActive: true,
      },
    });

    for (const rule of activeRules) {
      const conditions = (rule.conditions as any[]) || [];
      let matches = true;

      // Evaluate each condition
      for (const cond of conditions) {
        if (cond.field === 'body' && context.messageText) {
          const val = (cond.value || '').toUpperCase();
          const text = (context.messageText || '').toUpperCase();

          if (cond.operator === 'CONTAINS' && !text.includes(val)) {
            matches = false;
            break;
          } else if (cond.operator === 'EQUALS' && text.trim() !== val.trim()) {
            matches = false;
            break;
          } else if (cond.operator === 'STARTS_WITH' && !text.startsWith(val)) {
            matches = false;
            break;
          }
        }
      }

      if (matches) {
        this.logger.log(`Automation rule "${rule.name}" triggered for contact ${context.contactId}`);
        await this.executeRuleActions(rule, context);
      }
    }
  }

  private async executeRuleActions(rule: any, context: any) {
    const actions = (rule.actions as any[]) || [];

    try {
      for (const act of actions) {
        if (act.type === AutomationActionType.SEND_TEXT_MESSAGE && act.config?.text) {
          // Create message record
          const msg = await this.prisma.message.create({
            data: {
              organizationId: rule.organizationId,
              phoneNumberId: context.phoneNumberId,
              contactId: context.contactId,
              conversationId: context.conversationId,
              direction: MessageDirection.OUTBOUND,
              type: MessageType.TEXT,
              status: MessageStatus.QUEUED,
              body: act.config.text,
            },
          });

          // Enqueue outbox send
          await this.prisma.outboxEvent.create({
            data: {
              organizationId: rule.organizationId,
              type: JobType.SEND_INDIVIDUAL_MESSAGE,
              payload: {
                messageId: msg.id,
                phoneNumberId: context.phoneNumberId,
                body: act.config.text,
                type: MessageType.TEXT,
              },
              status: JobStatus.PENDING,
            },
          });
        } else if (act.type === AutomationActionType.ADD_TAG && act.config?.tagName) {
          const tag = await this.prisma.tag.upsert({
            where: {
              organizationId_name: {
                organizationId: rule.organizationId,
                name: act.config.tagName.trim(),
              },
            },
            create: { organizationId: rule.organizationId, name: act.config.tagName.trim() },
            update: {},
          });

          await this.prisma.contactTag.upsert({
            where: {
              contactId_tagId: {
                contactId: context.contactId,
                tagId: tag.id,
              },
            },
            create: { contactId: context.contactId, tagId: tag.id },
            update: {},
          });
        }
      }

      // Record successful execution
      await this.prisma.automationExecution.create({
        data: {
          automationRuleId: rule.id,
          contactId: context.contactId,
          status: 'SUCCESS',
        },
      });

      await this.prisma.automationRule.update({
        where: { id: rule.id },
        data: { executionCount: { increment: 1 } },
      });
    } catch (err: any) {
      this.logger.error(`Failed to execute actions for rule ${rule.id}: ${err.message}`);
      await this.prisma.automationExecution.create({
        data: {
          automationRuleId: rule.id,
          contactId: context.contactId,
          status: 'FAILED',
          error: err.message,
        },
      });
    }
  }
}

