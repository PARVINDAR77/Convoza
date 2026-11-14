import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  AutomationTrigger,
  AutomationCondition,
  AutomationAction,
} from '@convoza/shared-types';

export class CreateAutomationDto {
  @ApiProperty({ example: 'Auto-Reply on Keyword "PRICE"' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({ example: 'Sends pricing catalog template when user texts PRICE or PRICING' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: AutomationTrigger, default: AutomationTrigger.KEYWORD_DETECTED })
  @IsEnum(AutomationTrigger)
  trigger!: AutomationTrigger;

  @ApiProperty({
    example: [
      { field: 'body', operator: 'CONTAINS', value: 'PRICE' },
    ],
  })
  @IsArray()
  conditions!: AutomationCondition[];

  @ApiProperty({
    example: [
      {
        type: 'SEND_TEXT_MESSAGE',
        config: { text: 'Our pricing plans start from INR 1,999/month. Visit https://convoza.io/pricing' },
      },
      {
        type: 'ADD_TAG',
        config: { tagName: 'Interested in Pricing' },
      },
    ],
  })
  @IsArray()
  actions!: AutomationAction[];

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}

export class UpdateAutomationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: AutomationTrigger })
  @IsOptional()
  @IsEnum(AutomationTrigger)
  trigger?: AutomationTrigger;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  conditions?: AutomationCondition[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  actions?: AutomationAction[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

