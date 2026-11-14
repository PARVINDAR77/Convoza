import { Module } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { WebhooksController } from './webhooks.controller';
import { InboxModule } from '../inbox/inbox.module';
import { AutomationsModule } from '../automations/automations.module';

@Module({
  imports: [InboxModule, AutomationsModule],
  controllers: [WebhooksController],
  providers: [WebhooksService],
  exports: [WebhooksService],
})
export class WebhooksModule {}
