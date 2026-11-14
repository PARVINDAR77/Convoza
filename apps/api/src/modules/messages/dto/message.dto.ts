import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MessageType } from '@convoza/shared-types';

export class SendIndividualMessageDto {
  @ApiProperty({ description: 'Phone number ID of the sending WhatsApp number' })
  @IsString()
  @IsNotEmpty()
  phoneNumberId!: string;

  @ApiProperty({ example: '+919876543210' })
  @IsString()
  @IsNotEmpty()
  recipientPhone!: string;

  @ApiProperty({ enum: MessageType, default: MessageType.TEXT })
  @IsEnum(MessageType)
  type!: MessageType;

  @ApiPropertyOptional({ example: 'Hello Alice, your support ticket #4812 has been resolved.' })
  @IsOptional()
  @IsString()
  body?: string;

  @ApiPropertyOptional({ description: 'Template ID if sending an approved Meta WhatsApp template' })
  @IsOptional()
  @IsString()
  templateId?: string;

  @ApiPropertyOptional({
    description: 'Dynamic variable values for template e.g., { "1": "Alice", "2": "4812" }',
  })
  @IsOptional()
  @IsObject()
  templateParameters?: Record<string, string>;

  @ApiPropertyOptional({ example: 'https://convoza.io/assets/invoice.pdf' })
  @IsOptional()
  @IsString()
  mediaUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mediaType?: string;

  @ApiPropertyOptional({ description: 'Client-generated idempotency key' })
  @IsOptional()
  @IsString()
  idempotencyKey?: string;
}

