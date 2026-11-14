import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApiKeysService } from './api-keys.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CurrentOrg, Roles } from '../../common/decorators';
import { UserRole } from '@convoza/shared-types';

@ApiTags('Developer API Keys')
@Controller('api-keys')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Get()
  @ApiOperation({ summary: 'List API keys configured for this organization' })
  async getKeys(@CurrentOrg() org: any) {
    return this.apiKeysService.getApiKeys(org.id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_OWNER)
  @ApiOperation({ summary: 'Generate a new API key (full secret returned only once)' })
  async createKey(@CurrentOrg() org: any, @Body('name') name: string) {
    return this.apiKeysService.createApiKey(org.id, name || 'API Token');
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_OWNER)
  @ApiOperation({ summary: 'Revoke and delete an API key' })
  async revokeKey(@CurrentOrg() org: any, @Param('id') id: string) {
    return this.apiKeysService.revokeApiKey(org.id, id);
  }
}
