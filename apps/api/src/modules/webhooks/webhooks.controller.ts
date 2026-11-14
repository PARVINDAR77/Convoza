import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
  ForbiddenException,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { WebhooksService } from './webhooks.service';
import { META_CONFIG, verifyMetaWebhookSignature, verifyRazorpaySignature } from '@convoza/configuration';

@ApiTags('Webhooks Ingestion')
@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Get('meta/whatsapp')
  @ApiOperation({ summary: 'Meta WhatsApp Webhook Verification Challenge endpoint' })
  verifyMetaWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
    @Res() res: Response
  ) {
    if (mode === 'subscribe' && token === META_CONFIG.WEBHOOK_VERIFY_TOKEN) {
      return res.status(HttpStatus.OK).send(challenge);
    }
    throw new ForbiddenException('Meta webhook challenge verification failed: token mismatch');
  }

  @Post('meta/whatsapp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Receive live WhatsApp status receipts and incoming messages' })
  async handleMetaWebhook(
    @Body() payload: any,
    @Headers('x-hub-signature-256') signature?: string
  ) {
    // Note: Signature verification can be enforced in production with rawBody preservation
    return this.webhooksService.processMetaWebhook(payload);
  }

  @Post('razorpay')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Receive Razorpay payment and subscription webhooks' })
  async handleRazorpayWebhook(
    @Body() payload: any,
    @Headers('x-razorpay-signature') signature?: string
  ) {
    return { received: true };
  }
}
