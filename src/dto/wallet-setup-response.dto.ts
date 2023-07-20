import { ApiProperty } from '@nestjs/swagger';
import { TransactionResponseDto } from './transaction-response.dto';

export class WalletSetupResponseDto extends TransactionResponseDto {
  @ApiProperty({ description: 'wallet id' })
  id: string;

  @ApiProperty({ description: 'name of the wallet' })
  name: string;

  @ApiProperty({ description: 'date of creation' })
  date: Date;
}
