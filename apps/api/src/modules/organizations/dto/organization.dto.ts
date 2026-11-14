import { IsNotEmpty, IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '@convoza/shared-types';

export class CreateOrganizationDto {
  @ApiProperty({ example: 'Global Retail Corp' })
  @IsString()
  @IsNotEmpty()
  name!: string;
}

export class UpdateOrganizationDto {
  @ApiPropertyOptional({ example: 'Global Retail Corp Ltd' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  logoUrl?: string;
}

export class InviteMemberDto {
  @ApiProperty({ example: 'support.lead@company.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ enum: UserRole, default: UserRole.AGENT })
  @IsEnum(UserRole)
  role!: UserRole;
}

