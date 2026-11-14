import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BillingService } from './billing.service';
import { CreateCheckoutDto, VerifyPaymentDto } from './dto/billing.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CurrentOrg, Roles } from '../../common/decorators';
import { UserRole } from '@convoza/shared-types';

@ApiTags('Subscriptions & Billing')
@Controller('billing')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('plans')
  @ApiOperation({ summary: 'List all available subscription plans and tiers' })
  async getPlans() {
    return this.billingService.getPlans();
  }

  @Get('subscription')
  @ApiOperation({ summary: 'Get current organization subscription details and limits' })
  async getSubscription(@CurrentOrg() org: any) {
    return this.billingService.getSubscription(org.id);
  }

  @Post('checkout')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_OWNER)
  @ApiOperation({ summary: 'Create Razorpay checkout order for plan upgrade/renewal' })
  async createCheckout(@CurrentOrg() org: any, @Body() dto: CreateCheckoutDto) {
    return this.billingService.createCheckout(org.id, dto);
  }

  @Post('verify')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ORG_ADMIN, UserRole.ORG_OWNER)
  @ApiOperation({ summary: 'Verify Razorpay payment signature server-side and activate subscription' })
  async verifyPayment(@CurrentOrg() org: any, @Body() dto: VerifyPaymentDto) {
    return this.billingService.verifyPayment(org.id, dto);
  }

  @Get('invoices')
  @ApiOperation({ summary: 'List past invoices and receipts' })
  async getInvoices(@CurrentOrg() org: any) {
    return this.billingService.getInvoices(org.id);
  }

  @Get('usage')
  @ApiOperation({ summary: 'Get current month messaging and contact usage vs plan allowances' })
  async getUsage(@CurrentOrg() org: any) {
    return this.billingService.getUsage(org.id);
  }
}

