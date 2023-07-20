import { ApiProperty } from '@nestjs/swagger';
import { Min, IsNumber, IsString, MinLength, IsEnum } from 'class-validator';
import { TransactionType } from '../schemas';

export class TransactionInputDto {
  @ApiProperty({
    name: 'amount',
    minimum: 1,
    description: 'Transaction Amount',
  })
  @Min(1, { message: 'amount must be atleast 1' })
  @IsNumber()
  amount: number;

  @ApiProperty({
    name: 'description',
    description: 'remarks for transaction',
    minLength: 3,
  })
  @MinLength(1, { message: 'description must not be empty' })
  @IsString({ message: 'description must be a string' })
  description: string;

  @ApiProperty({
    name: 'type',
    description: 'transaction type',
    enum: TransactionType,
  })
  @IsEnum(TransactionType)
  type: string;
}
