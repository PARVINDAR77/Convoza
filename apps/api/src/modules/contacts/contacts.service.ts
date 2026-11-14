import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateContactDto, UpdateContactDto, CsvImportDto } from './dto/contact.dto';
import { normalizeE164, validateContactInput } from '@convoza/validation';
import { ConsentStatus, ConsentSource } from '@convoza/shared-types';

@Injectable()
export class ContactsService {
  private readonly logger = new Logger(ContactsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getContacts(
    organizationId: string,
    query: {
      page?: number;
      limit?: number;
      search?: string;
      tagId?: string;
      listId?: string;
      consentStatus?: string;
    }
  ) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
    const skip = (page - 1) * limit;

    const where: any = { organizationId };

    if (query.consentStatus) {
      where.consentStatus = query.consentStatus as ConsentStatus;
    }

    if (query.tagId) {
      where.tags = { some: { tagId: query.tagId } };
    }

    if (query.listId) {
      where.listMemberships = { some: { contactListId: query.listId } };
    }

    if (query.search) {
      const term = query.search.trim();
      where.OR = [
        { name: { contains: term, mode: 'insensitive' } },
        { phone: { contains: term } },
        { email: { contains: term, mode: 'insensitive' } },
      ];
    }

    const [total, contacts] = await Promise.all([
      this.prisma.contact.count({ where }),
      this.prisma.contact.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          tags: {
            include: { tag: true },
          },
        },
      }),
    ]);

    return {
      items: contacts.map((c) => ({
        id: c.id,
        phone: c.phone,
        name: c.name,
        email: c.email,
        consentStatus: c.consentStatus,
        consentSource: c.consentSource,
        consentTimestamp: c.consentTimestamp,
        customFields: c.customFields,
        tags: c.tags.map((t) => t.tag),
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      })),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getContactById(organizationId: string, id: string) {
    const contact = await this.prisma.contact.findFirst({
      where: { id, organizationId },
      include: {
        tags: { include: { tag: true } },
        listMemberships: { include: { contactList: true } },
        consentRecords: { orderBy: { recordedAt: 'desc' }, take: 10 },
      },
    });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    return {
      ...contact,
      tags: contact.tags.map((t) => t.tag),
      lists: contact.listMemberships.map((l) => l.contactList),
    };
  }

  async createContact(organizationId: string, dto: CreateContactDto) {
    const validation = validateContactInput(dto);
    if (!validation.isValid) {
      throw new BadRequestException(validation.errors.join(', '));
    }

    const existing = await this.prisma.contact.findUnique({
      where: {
        organizationId_phone: {
          organizationId,
          phone: validation.data!.phone,
        },
      },
    });

    if (existing) {
      throw new ConflictException(`Contact with phone ${validation.data!.phone} already exists`);
    }

    return this.prisma.$transaction(async (tx) => {
      const contact = await tx.contact.create({
        data: {
          organizationId,
          phone: validation.data!.phone,
          name: validation.data!.name,
          email: validation.data!.email,
          consentStatus: validation.data!.consentStatus,
          consentSource: dto.consentSource || ConsentSource.IMPORT,
          customFields: (dto.customFields as any) || {},
        },
      });

      // Record consent audit log
      await tx.consentRecord.create({
        data: {
          contactId: contact.id,
          status: contact.consentStatus,
          source: contact.consentSource,
          notes: 'Initial contact registration',
        },
      });

      // Connect tags if provided
      if (dto.tags && dto.tags.length > 0) {
        for (const tagName of dto.tags) {
          const trimmedTag = tagName.trim();
          if (!trimmedTag) continue;

          const tag = await tx.tag.upsert({
            where: { organizationId_name: { organizationId, name: trimmedTag } },
            create: { organizationId, name: trimmedTag },
            update: {},
          });

          await tx.contactTag.create({
            data: { contactId: contact.id, tagId: tag.id },
          });
        }
      }

      return contact;
    });
  }

  async updateContact(organizationId: string, id: string, dto: UpdateContactDto) {
    const contact = await this.prisma.contact.findFirst({
      where: { id, organizationId },
    });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    return this.prisma.$transaction(async (tx) => {
      // If consent status changed, record consent history
      if (dto.consentStatus && dto.consentStatus !== contact.consentStatus) {
        await tx.consentRecord.create({
          data: {
            contactId: contact.id,
            status: dto.consentStatus,
            source: ConsentSource.API,
            notes: `Consent updated to ${dto.consentStatus}`,
          },
        });
      }

      const updated = await tx.contact.update({
        where: { id },
        data: {
          ...(dto.name !== undefined && { name: dto.name }),
          ...(dto.email !== undefined && { email: dto.email }),
          ...(dto.consentStatus && {
            consentStatus: dto.consentStatus,
            consentTimestamp: new Date(),
          }),
          ...(dto.customFields && { customFields: dto.customFields as any }),
        },
      });

      if (dto.tags) {
        // Clear existing tags
        await tx.contactTag.deleteMany({ where: { contactId: id } });

        for (const tagName of dto.tags) {
          const trimmed = tagName.trim();
          if (!trimmed) continue;
          const tag = await tx.tag.upsert({
            where: { organizationId_name: { organizationId, name: trimmed } },
            create: { organizationId, name: trimmed },
            update: {},
          });
          await tx.contactTag.create({
            data: { contactId: id, tagId: tag.id },
          });
        }
      }

      return updated;
    });
  }

  async deleteContact(organizationId: string, id: string) {
    const contact = await this.prisma.contact.findFirst({
      where: { id, organizationId },
    });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    await this.prisma.contact.delete({ where: { id } });
    return { success: true, message: 'Contact deleted successfully' };
  }

  /**
   * Bulk CSV/Array Contact Import with normalization, duplicate detection, and progress reporting
   */
  async importContacts(organizationId: string, dto: CsvImportDto) {
    if (!dto.contacts || dto.contacts.length === 0) {
      throw new BadRequestException('Import array cannot be empty');
    }

    let successCount = 0;
    let duplicateCount = 0;
    let errorCount = 0;
    const errors: Array<{ row: number; phone?: string; error: string }> = [];

    // Optional list creation
    let contactList: any = null;
    if (dto.listName) {
      contactList = await this.prisma.contactList.create({
        data: {
          organizationId,
          name: dto.listName.trim(),
          description: `Imported on ${new Date().toLocaleDateString()}`,
        },
      });
    }

    for (let i = 0; i < dto.contacts.length; i++) {
      const row = dto.contacts[i];
      const rowNum = i + 1;

      const norm = normalizeE164(row.phone);
      if (!norm.isValid) {
        errorCount++;
        errors.push({ row: rowNum, phone: row.phone, error: norm.error || 'Invalid phone number' });
        continue;
      }

      const phone = norm.normalized;

      try {
        const existing = await this.prisma.contact.findUnique({
          where: { organizationId_phone: { organizationId, phone } },
        });

        let contactId = existing?.id;

        if (existing) {
          duplicateCount++;
          if (dto.updateExisting) {
            await this.prisma.contact.update({
              where: { id: existing.id },
              data: {
                ...(row.name && { name: row.name.trim() }),
                ...(row.email && { email: row.email.trim() }),
                ...(row.customFields && { customFields: row.customFields as any }),
              },
            });
          }
        } else {
          const created = await this.prisma.contact.create({
            data: {
              organizationId,
              phone,
              name: row.name?.trim(),
              email: row.email?.trim(),
              consentStatus: ConsentStatus.OPTED_IN,
              consentSource: ConsentSource.IMPORT,
              customFields: (row.customFields as any) || {},
            },
          });
          contactId = created.id;
          successCount++;
        }

        // Link to list if created
        if (contactList && contactId) {
          await this.prisma.contactListMember.upsert({
            where: {
              contactListId_contactId: {
                contactListId: contactList.id,
                contactId,
              },
            },
            create: {
              contactListId: contactList.id,
              contactId,
            },
            update: {},
          });
        }

        // Process row tags if present
        if (row.tags && contactId) {
          const tagNames = row.tags.split(',').map((t) => t.trim()).filter(Boolean);
          for (const tName of tagNames) {
            const tag = await this.prisma.tag.upsert({
              where: { organizationId_name: { organizationId, name: tName } },
              create: { organizationId, name: tName },
              update: {},
            });
            await this.prisma.contactTag.upsert({
              where: { contactId_tagId: { contactId, tagId: tag.id } },
              create: { contactId, tagId: tag.id },
              update: {},
            });
          }
        }
      } catch (err: any) {
        errorCount++;
        errors.push({ row: rowNum, phone, error: err.message });
      }
    }

    return {
      totalRows: dto.contacts.length,
      successCount,
      duplicateCount,
      errorCount,
      errors: errors.slice(0, 50), // return top 50 errors if any
      listId: contactList?.id,
      listName: contactList?.name,
    };
  }

  /**
   * Export contacts to CSV format
   */
  async exportContacts(organizationId: string) {
    const contacts = await this.prisma.contact.findMany({
      where: { organizationId },
      include: {
        tags: { include: { tag: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 10000,
    });

    const headers = ['Phone', 'Name', 'Email', 'ConsentStatus', 'Tags', 'CreatedAt'];
    const rows = contacts.map((c) => [
      `"${c.phone}"`,
      `"${(c.name || '').replace(/"/g, '""')}"`,
      `"${(c.email || '').replace(/"/g, '""')}"`,
      `"${c.consentStatus}"`,
      `"${c.tags.map((t) => t.tag.name).join(';')}"`,
      `"${c.createdAt.toISOString()}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    return {
      filename: `convoza-contacts-${Date.now()}.csv`,
      data: csvContent,
      count: contacts.length,
    };
  }

  async getTags(organizationId: string) {
    return this.prisma.tag.findMany({
      where: { organizationId },
      include: {
        _count: { select: { contacts: true } },
      },
      orderBy: { name: 'asc' },
    });
  }

  async getLists(organizationId: string) {
    return this.prisma.contactList.findMany({
      where: { organizationId },
      include: {
        _count: { select: { members: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

