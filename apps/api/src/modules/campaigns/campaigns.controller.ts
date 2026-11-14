import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto, UpdateCampaignDto } from './dto/campaign.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentOrg } from '../../common/decorators';

@ApiTags('Bulk WhatsApp Campaigns')
@Controller('campaigns')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  @ApiOperation({ summary: 'List campaigns with status and search filters' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'search', required: false })
  async getCampaigns(
    @CurrentOrg() org: any,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
    @Query('search') search?: string
  ) {
    return this.campaignsService.getCampaigns(org.id, { page, limit, status, search });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new campaign with audience selection and variable mapping' })
  async createCampaign(@CurrentOrg() org: any, @Body() dto: CreateCampaignDto) {
    return this.campaignsService.createCampaign(org.id, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get campaign details and recipient breakdown' })
  async getCampaign(@CurrentOrg() org: any, @Param('id') id: string) {
    return this.campaignsService.getCampaignById(org.id, id);
  }

  @Post(':id/estimate')
  @ApiOperation({ summary: 'Estimate audience size, suppressed contacts, and delivery time' })
  async estimateCampaign(@CurrentOrg() org: any, @Param('id') id: string) {
    return this.campaignsService.estimateCampaign(org.id, id);
  }

  @Post(':id/start')
  @ApiOperation({ summary: 'Start campaign execution through background worker queue' })
  async startCampaign(@CurrentOrg() org: any, @Param('id') id: string) {
    return this.campaignsService.startCampaign(org.id, id);
  }

  @Post(':id/pause')
  @ApiOperation({ summary: 'Pause an actively running campaign' })
  async pauseCampaign(@CurrentOrg() org: any, @Param('id') id: string) {
    return this.campaignsService.pauseCampaign(org.id, id);
  }

  @Post(':id/resume')
  @ApiOperation({ summary: 'Resume a paused campaign' })
  async resumeCampaign(@CurrentOrg() org: any, @Param('id') id: string) {
    return this.campaignsService.resumeCampaign(org.id, id);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel campaign' })
  async cancelCampaign(@CurrentOrg() org: any, @Param('id') id: string) {
    return this.campaignsService.cancelCampaign(org.id, id);
  }

  @Get(':id/analytics')
  @ApiOperation({ summary: 'Get delivery, read, and reply rates for campaign' })
  async getAnalytics(@CurrentOrg() org: any, @Param('id') id: string) {
    return this.campaignsService.getCampaignAnalytics(org.id, id);
  }
}

