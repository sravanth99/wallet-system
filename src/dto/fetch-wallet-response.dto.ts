import { ApiProperty } from '@nestjs/swagger';
import { WalletResponseDto } from './wallet-response.dto';

export class FetchWalletResponseDto extends WalletResponseDto {
  @ApiProperty({ description: 'wallet balance' })
  balance: number;
}
