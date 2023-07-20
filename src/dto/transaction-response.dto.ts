import { ApiProperty } from '@nestjs/swagger';

export class TransactionResponseDto {
  @ApiProperty({ description: 'wallet balance' })
  balance: number;

  @ApiProperty({ description: 'transaction id' })
  transactionId: string;
}
