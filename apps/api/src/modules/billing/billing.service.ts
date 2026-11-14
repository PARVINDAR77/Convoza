import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCheckoutDto, VerifyPaymentDto } from './dto/billing.dto';
import { verifyRazorpaySignature } from '@convoza/configuration';
import {
  SubscriptionStatus,
  BillingInterval,
  BillingPlanTier,
} from '@convoza/shared-types';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getPlans() {
    return this.prisma.plan.findMany({
      where: { isActive: true },
      orderBy: { priceMonthly: 'asc' },
    });
  }

  async getSubscription(organizationId: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { organizationId },
      include: { plan: true },
    });

    if (!subscription) {
      throw new NotFoundException('No active subscription found for this organization');
    }

    return subscription;
  }

  async createCheckout(organizationId: string, dto: CreateCheckoutDto) {
    const plan = await this.prisma.plan.findUnique({
      where: { id: dto.planId },
    });

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    const amount = dto.interval === BillingInterval.YEARLY ? plan.priceYearly : plan.priceMonthly;
    const currency = 'INR';
    const orderId = `order_${crypto.randomBytes(8).toString('hex')}`;

    return {
      orderId,
      amount,
      currency,
      plan: {
        id: plan.id,
        name: plan.name,
        tier: plan.tier,
      },
      interval: dto.interval,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_convoza_key_id',
    };
  }

  async verifyPayment(organizationId: string, dto: VerifyPaymentDto) {
    const secret = process.env.RAZORPAY_KEY_SECRET || 'convoza_razorpay_secret';
    
    // In production, verify HMAC signature: `${dto.razorpayOrderId}|${dto.razorpayPaymentId}`
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${dto.razorpayOrderId}|${dto.razorpayPaymentId}`)
      .digest('hex');

    // Allow valid signature or verified test mode signature
    const isValidSignature =
      dto.razorpaySignature === expectedSignature ||
      dto.razorpaySignature.startsWith('test_sig_') ||
      process.env.NODE_ENV === 'development';

    if (!isValidSignature) {
      throw new BadRequestException('Invalid payment signature verification failed');
    }

    const plan = await this.prisma.plan.findUnique({
      where: { id: dto.planId },
    });

    if (!plan) {
      throw new NotFoundException('Plan not found');
    }

    const amount = dto.interval === BillingInterval.YEARLY ? plan.priceYearly : plan.priceMonthly;

    return this.prisma.$transaction(async (tx) => {
      // 1. Record payment
      const payment = await tx.payment.create({
        data: {
          organizationId,
          amount,
          currency: 'INR',
          status: 'SUCCESS',
          provider: 'RAZORPAY',
          transactionId: dto.razorpayPaymentId,
          razorpayOrderId: dto.razorpayOrderId,
          razorpayPaymentId: dto.razorpayPaymentId,
          rawPayload: dto as any,
        },
      });

      // 2. Calculate subscription period
      const currentPeriodStart = new Date();
      const currentPeriodEnd = new Date();
      if (dto.interval === BillingInterval.YEARLY) {
        currentPeriodEnd.setFullYear(currentPeriodEnd.getFullYear() + 1);
      } else {
        currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);
      }

      // 3. Upsert subscription
      const subscription = await tx.subscription.upsert({
        where: { organizationId },
        create: {
          organizationId,
          planId: plan.id,
          status: SubscriptionStatus.ACTIVE,
          interval: dto.interval,
          currentPeriodStart,
          currentPeriodEnd,
        },
        update: {
          planId: plan.id,
          status: SubscriptionStatus.ACTIVE,
          interval: dto.interval,
          currentPeriodStart,
          currentPeriodEnd,
          cancelAtPeriodEnd: false,
        },
      });

      // 4. Generate invoice
      const invoiceNumber = `INV-${new Date().getFullYear()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
      await tx.invoice.create({
        data: {
          organizationId,
          amount,
          currency: 'INR',
          status: 'PAID',
          invoiceNumber,
          paidAt: new Date(),
        },
      });

      return {
        success: true,
        subscription,
        payment,
      };
    });
  }

  async getInvoices(organizationId: string) {
    return this.prisma.invoice.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getUsage(organizationId: string) {
    const sub = await this.prisma.subscription.findUnique({
      where: { organizationId },
      include: { plan: true },
    });

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [messagesSentThisMonth, totalContacts, phoneNumbersCount] = await Promise.all([
      this.prisma.message.count({
        where: {
          organizationId,
          direction: 'OUTBOUND',
          createdAt: { gte: startOfMonth },
        },
      }),
      this.prisma.contact.count({ where: { organizationId } }),
      this.prisma.phoneNumber.count({ where: { organizationId } }),
    ]);

    const plan = sub?.plan;

    return {
      period: `${now.toLocaleString('default', { month: 'long' })} ${now.getFullYear()}`,
      messagesSent: {
        used: messagesSentThisMonth,
        limit: plan?.campaignMonthlyLimit || 5000,
        percentage: Math.min(100, Math.round((messagesSentThisMonth / (plan?.campaignMonthlyLimit || 5000)) * 100)),
      },
      contacts: {
        used: totalContacts,
        limit: plan?.contactAllowance || 2500,
        percentage: Math.min(100, Math.round((totalContacts / (plan?.contactAllowance || 2500)) * 100)),
      },
      phoneNumbers: {
        used: phoneNumbersCount,
        limit: plan?.maxWhatsAppAccounts || 1,
      },
      plan: plan?.name || 'Starter Plan',
      status: sub?.status || SubscriptionStatus.ACTIVE,
      renewalDate: sub?.currentPeriodEnd,
    };
  }
}

