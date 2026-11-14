import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentOrg } from '../../common/decorators';

@ApiTags('Analytics & Performance Reports')
@Controller('analytics')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get aggregated dashboard KPIs and rates' })
  async getDashboardMetrics(@CurrentOrg() org: any) {
    return this.analyticsService.getDashboardMetrics(org.id);
  }

  @Get('timeseries')
  @ApiOperation({ summary: 'Get 7-day or 30-day messaging volume and delivery trends' })
  @ApiQuery({ name: 'days', required: false, type: Number })
  async getTimeseries(@CurrentOrg() org: any, @Query('days') days?: number) {
    return this.analyticsService.getTimeseries(org.id, days ? Number(days) : 7);
  }

  @Get('campaigns')
  @ApiOperation({ summary: 'Get recent campaign performance metrics' })
  async getCampaignsPerformance(@CurrentOrg() org: any) {
    return this.analyticsService.getCampaignsPerformance(org.id);
  }
}
