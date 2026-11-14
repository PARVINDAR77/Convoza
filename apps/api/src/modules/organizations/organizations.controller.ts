import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto, UpdateOrganizationDto, InviteMemberDto } from './dto/organization.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CurrentUser, CurrentOrg, Roles } from '../../common/decorators';
import { UserRole } from '@convoza/shared-types';

@ApiTags('Organizations')
@Controller('organizations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrganizationsController {
  constructor(private readonly orgsService: OrganizationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all organizations accessible by current user' })
  async getUserOrganizations(@CurrentUser() user: any) {
    return this.orgsService.getUserOrganizations(user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new organization' })
  async createOrganization(@CurrentUser() user: any, @Body() dto: CreateOrganizationDto) {
    return this.orgsService.createOrganization(user.id, dto);
  }

  @Get(':id')
  @UseGuards(TenantGuard)
  @ApiOperation({ summary: 'Get details for a specific organization' })
  async getOrganization(@Param('id') id: string) {
    return this.orgsService.getOrganization(id);
  }

  @Patch(':id')
  @UseGuards(TenantGuard, RolesGuard)
  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_OWNER)
  @ApiOperation({ summary: 'Update organization name or branding' })
  async updateOrganization(@Param('id') id: string, @Body() dto: UpdateOrganizationDto) {
    return this.orgsService.updateOrganization(id, dto);
  }

  @Get(':id/members')
  @UseGuards(TenantGuard)
  @ApiOperation({ summary: 'List team members and pending invitations' })
  async getMembers(@Param('id') id: string) {
    return this.orgsService.getMembers(id);
  }

  @Post(':id/invitations')
  @UseGuards(TenantGuard, RolesGuard)
  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_OWNER)
  @ApiOperation({ summary: 'Invite a new team member to this organization' })
  async inviteMember(@Param('id') id: string, @Body() dto: InviteMemberDto) {
    return this.orgsService.inviteMember(id, dto);
  }

  @Delete(':id/members/:memberId')
  @UseGuards(TenantGuard, RolesGuard)
  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_OWNER)
  @ApiOperation({ summary: 'Remove a team member from this organization' })
  async removeMember(@Param('id') id: string, @Param('memberId') memberId: string) {
    return this.orgsService.removeMember(id, memberId);
  }
}

