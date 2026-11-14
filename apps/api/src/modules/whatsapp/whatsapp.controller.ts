import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WhatsAppService } from './whatsapp.service';
import {
  ManualConnectDto,
  ValidateManualCredentialsDto,
  EmbeddedSignupCallbackDto,
} from './dto/whatsapp.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CurrentOrg, Roles } from '../../common/decorators';
import { UserRole } from '@convoza/shared-types';

@ApiTags('WhatsApp Business Integration')
@Controller('whatsapp')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class WhatsAppController {
  constructor(private readonly whatsAppService: WhatsAppService) {}

  @Get('accounts')
  @ApiOperation({ summary: 'List all connected WhatsApp accounts and phone numbers' })
  async getAccounts(@CurrentOrg() org: any) {
    return this.whatsAppService.getAccounts(org.id);
  }

  @Post('manual/validate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Validate Meta credentials against official Graph API' })
  async validateManualCredentials(@Body() dto: ValidateManualCredentialsDto) {
    return this.whatsAppService.validateMetaCredentials(dto);
  }

  @Post('manual/connect')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_OWNER)
  @ApiOperation({ summary: 'Connect WhatsApp account via manual WABA credentials' })
  async connectManual(@CurrentOrg() org: any, @Body() dto: ManualConnectDto) {
    return this.whatsAppService.connectManualAccount(org.id, dto);
  }

  @Post('embedded-signup/session')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_OWNER)
  @ApiOperation({ summary: 'Initiate Meta Embedded Signup session' })
  async getEmbeddedSignupSession(@CurrentOrg() org: any) {
    return this.whatsAppService.getEmbeddedSignupSession(org.id);
  }

  @Post('embedded-signup/callback')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_OWNER)
  @ApiOperation({ summary: 'Complete Meta Embedded Signup with server-side exchange' })
  async handleEmbeddedSignupCallback(
    @CurrentOrg() org: any,
    @Body() dto: EmbeddedSignupCallbackDto
  ) {
    return this.whatsAppService.handleEmbeddedSignupCallback(org.id, dto);
  }

  @Post('accounts/:id/sync')
  @ApiOperation({ summary: 'Synchronize account and phone numbers with Meta Cloud API' })
  async syncAccount(@CurrentOrg() org: any, @Param('id') accountId: string) {
    return this.whatsAppService.syncAccount(org.id, accountId);
  }

  @Delete('accounts/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_OWNER)
  @ApiOperation({ summary: 'Disconnect WhatsApp account' })
  async disconnectAccount(@CurrentOrg() org: any, @Param('id') accountId: string) {
    return this.whatsAppService.disconnectAccount(org.id, accountId);
  }
}

