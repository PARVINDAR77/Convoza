import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsObject,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCampaignDto {
  @ApiProperty({ example: 'Festival Sale Blast 2026' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'Sending WhatsApp phone number ID' })
  @IsString()
  @IsNotEmpty()
  phoneNumberId!: string;

  @ApiProperty({ description: 'Template ID of an approved Meta WhatsApp template' })
  @IsString()
  @IsNotEmpty()
  templateId!: string;

  @ApiPropertyOptional({ description: 'Target contact list ID' })
  @IsOptional()
  @IsString()
  contactListId?: string;

  @ApiPropertyOptional({ description: 'Target contact tag IDs' })
  @IsOptional()
  @IsArray()
  tagIds?: string[];

  @ApiPropertyOptional({
    description: 'Dynamic variable mappings (e.g. { "1": "name", "2": "customFields.code" })',
  })
  @IsOptional()
  @IsObject()
  variableMapping?: Record<string, string>;

  @ApiPropertyOptional({ description: 'Scheduled execution time (ISO string)' })
  @IsOptional()
  @IsDateString()
  scheduledAt?: string;
}

export class UpdateCampaignDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phoneNumberId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  templateId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  variableMapping?: Record<string, string>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  scheduledAt?: string;
}

