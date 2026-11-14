import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ManualConnectDto {
  @ApiProperty({ example: 'My Retail WhatsApp' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: '109283746591029' })
  @IsString()
  @IsNotEmpty()
  wabaId!: string;

  @ApiProperty({ example: '102938475610293' })
  @IsString()
  @IsNotEmpty()
  phoneNumberId!: string;

  @ApiProperty({ example: 'EAAG...MetaPermanentToken' })
  @IsString()
  @IsNotEmpty()
  accessToken!: string;
}

export class ValidateManualCredentialsDto {
  @ApiProperty({ example: '102938475610293' })
  @IsString()
  @IsNotEmpty()
  phoneNumberId!: string;

  @ApiProperty({ example: 'EAAG...MetaPermanentToken' })
  @IsString()
  @IsNotEmpty()
  accessToken!: string;
}

export class EmbeddedSignupCallbackDto {
  @ApiProperty({ description: 'OAuth exchange code or access token from Meta Embedded Signup' })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiPropertyOptional({ description: 'WABA ID returned by Embedded Signup dialog' })
  @IsOptional()
  @IsString()
  wabaId?: string;

  @ApiPropertyOptional({ description: 'Phone Number ID returned by Embedded Signup dialog' })
  @IsOptional()
  @IsString()
  phoneNumberId?: string;
}

