import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { SendIndividualMessageDto } from './dto/message.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentOrg } from '../../common/decorators';

@ApiTags('WhatsApp Messages')
@Controller('messages')
@UseGuards(JwtAuthGuard, TenantGuard)
@ApiBearerAuth()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send an individual message or template with 24h window validation' })
  async sendMessage(@CurrentOrg() org: any, @Body() dto: SendIndividualMessageDto) {
    return this.messagesService.sendMessage(org.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List messages with filtering and pagination' })
  @ApiQuery({ name: 'conversationId', required: false })
  @ApiQuery({ name: 'contactId', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'direction', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async getMessages(
    @CurrentOrg() org: any,
    @Query('conversationId') conversationId?: string,
    @Query('contactId') contactId?: string,
    @Query('status') status?: string,
    @Query('direction') direction?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    return this.messagesService.getMessages(org.id, {
      conversationId,
      contactId,
      status,
      direction,
      page,
      limit,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details and delivery status history of a specific message' })
  async getMessage(@CurrentOrg() org: any, @Param('id') id: string) {
    return this.messagesService.getMessageById(org.id, id);
  }
}
