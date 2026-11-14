import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConsentStatus, ConsentSource } from '@convoza/shared-types';

export class CreateContactDto {
  @ApiProperty({ example: '+919876543210' })
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiPropertyOptional({ example: 'Alice Johnson' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'alice@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ enum: ConsentStatus, default: ConsentStatus.OPTED_IN })
  @IsOptional()
  @IsEnum(ConsentStatus)
  consentStatus?: ConsentStatus;

  @ApiPropertyOptional({ enum: ConsentSource, default: ConsentSource.IMPORT })
  @IsOptional()
  @IsEnum(ConsentSource)
  consentSource?: ConsentSource;

  @ApiPropertyOptional({ example: ['VIP', 'Newsletter'] })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiPropertyOptional({ example: { city: 'Mumbai', plan: 'Gold' } })
  @IsOptional()
  customFields?: Record<string, unknown>;
}

export class UpdateContactDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ enum: ConsentStatus })
  @IsOptional()
  @IsEnum(ConsentStatus)
  consentStatus?: ConsentStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  customFields?: Record<string, unknown>;
}

export class CsvImportDto {
  @ApiProperty({
    description: 'Array of contact rows parsed from CSV or JSON import payload',
    example: [
      { phone: '+919876543210', name: 'Alice Johnson', email: 'alice@example.com', tags: 'VIP,Loyal' },
      { phone: '+919876543211', name: 'Bob Smith', email: 'bob@example.com', tags: 'Prospect' },
    ],
  })
  @IsArray()
  contacts!: Array<{
    phone: string;
    name?: string;
    email?: string;
    tags?: string;
    customFields?: Record<string, unknown>;
  }>;

  @ApiPropertyOptional({ example: 'Spring 2026 Import' })
  @IsOptional()
  @IsString()
  listName?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  updateExisting?: boolean = true;
}

