import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BillingInterval } from '@convoza/shared-types';

export class CreateCheckoutDto {
  @ApiProperty({ description: 'ID of the selected billing plan' })
  @IsString()
  @IsNotEmpty()
  planId!: string;

  @ApiProperty({ enum: BillingInterval, default: BillingInterval.MONTHLY })
  @IsEnum(BillingInterval)
  interval!: BillingInterval;
}

export class VerifyPaymentDto {
  @ApiProperty({ example: 'order_EKwxwAgituLHJv' })
  @IsString()
  @IsNotEmpty()
  razorpayOrderId!: string;

  @ApiProperty({ example: 'pay_29QQoUBi66xm2f' })
  @IsString()
  @IsNotEmpty()
  razorpayPaymentId!: string;

  @ApiProperty({ example: '9ef470a252e449dd52f1c0103980004e09a3a0d1516ac75a8c6037081ff73a9c' })
  @IsString()
  @IsNotEmpty()
  razorpaySignature!: string;

  @ApiProperty({ description: 'Plan ID being subscribed' })
  @IsString()
  @IsNotEmpty()
  planId!: string;

  @ApiProperty({ enum: BillingInterval, default: BillingInterval.MONTHLY })
  @IsEnum(BillingInterval)
  interval!: BillingInterval;
}

