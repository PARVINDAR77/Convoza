import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { SuspendOrganizationDto } from './dto/admin.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators';

@ApiTags('Super Admin Operations')
@Controller('admin')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  private checkSuperAdmin(user: any) {
    if (!user?.isSuperAdmin) {
      throw new ForbiddenException('Super Admin privileges required to access this resource');
    }
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Platform-wide aggregated metrics, MRR, message counts, and queue health' })
  async getDashboard(@CurrentUser() user: any) {
    this.checkSuperAdmin(user);
    return this.adminService.getPlatformDashboard();
  }

  @Get('organizations')
  @ApiOperation({ summary: 'List and search all registered organizations' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  async getOrganizations(
    @CurrentUser() user: any,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string
  ) {
    this.checkSuperAdmin(user);
    return this.adminService.getOrganizations({ page, limit, search });
  }

  @Patch('organizations/:id/suspend')
  @ApiOperation({ summary: 'Suspend an organization for policy violations or non-payment' })
  async suspendOrg(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: SuspendOrganizationDto
  ) {
    this.checkSuperAdmin(user);
    return this.adminService.suspendOrganization(id, dto, user.id);
  }

  @Patch('organizations/:id/restore')
  @ApiOperation({ summary: 'Restore a suspended organization to active status' })
  async restoreOrg(@CurrentUser() user: any, @Param('id') id: string) {
    this.checkSuperAdmin(user);
    return this.adminService.restoreOrganization(id, user.id);
  }

  @Get('users')
  @ApiOperation({ summary: 'List all platform users and their tenant memberships' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'search', required: false })
  async getUsers(
    @CurrentUser() user: any,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string
  ) {
    this.checkSuperAdmin(user);
    return this.adminService.getUsers({ page, limit, search });
  }

  @Get('audit-logs')
  @ApiOperation({ summary: 'Platform audit logs' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async getAuditLogs(
    @CurrentUser() user: any,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    this.checkSuperAdmin(user);
    return this.adminService.getAuditLogs({ page, limit });
  }
}
