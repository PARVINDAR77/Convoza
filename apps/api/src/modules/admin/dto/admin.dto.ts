import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SuspendOrganizationDto {
  @ApiProperty({ example: 'Violation of WhatsApp acceptable use policy' })
  @IsString()
  @IsNotEmpty()
  reason!: string;
}

