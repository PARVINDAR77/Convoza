import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConversationStatus, MessageType } from '@convoza/shared-types';

export class AssignConversationDto {
  @ApiProperty({ description: 'User ID of the agent to assign, or null to unassign' })
  @IsOptional()
  @IsString()
  assignedToUserId?: string | null;
}

export class ResolveConversationDto {
  @ApiProperty({ enum: ConversationStatus, default: ConversationStatus.RESOLVED })
  @IsEnum(ConversationStatus)
  status!: ConversationStatus;
}

export class AddInternalNoteDto {
  @ApiProperty({ example: 'Customer called about refund. Refund approved under case #812.' })
  @IsString()
  @IsNotEmpty()
  content!: string;
}

export class InboxReplyDto {
  @ApiProperty({ enum: MessageType, default: MessageType.TEXT })
  @IsEnum(MessageType)
  type!: MessageType;

  @ApiPropertyOptional({ example: 'Thank you for contacting us! Let me check that for you right away.' })
  @IsOptional()
  @IsString()
  body?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mediaUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  templateId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  templateParameters?: Record<string, string>;
}

