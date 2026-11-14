import { Injectable, NotFoundException } from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ApiKeysService {
  constructor(private readonly prisma: PrismaService) {}

  async getApiKeys(organizationId: string) {
    return this.prisma.apiKey.findMany({
      where: { organizationId },
      select: {
        id: true,
        name: true,
        keyPrefix: true,
        isActive: true,
        lastUsedAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createApiKey(organizationId: string, name: string) {
    const rawSecret = crypto.randomBytes(32).toString('hex');
    const keyPrefix = `cvz_live_${rawSecret.slice(0, 8)}`;
    const fullKey = `${keyPrefix}_${rawSecret.slice(8)}`;
    const hashedSecret = crypto.createHash('sha256').update(fullKey).digest('hex');

    const record = await this.prisma.apiKey.create({
      data: {
        organizationId,
        name: name.trim(),
        keyPrefix,
        hashedSecret,
      },
    });

    return {
      id: record.id,
      name: record.name,
      apiKey: fullKey, // Only returned once upon creation!
      createdAt: record.createdAt,
    };
  }

  async revokeApiKey(organizationId: string, id: string) {
    const key = await this.prisma.apiKey.findFirst({
      where: { id, organizationId },
    });

    if (!key) {
      throw new NotFoundException('API Key not found');
    }

    await this.prisma.apiKey.delete({ where: { id } });
    return { success: true, message: 'API Key revoked' };
  }
}
