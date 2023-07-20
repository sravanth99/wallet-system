import { ApiProperty } from '@nestjs/swagger';

export class WalletResponseDto {
  @ApiProperty({ description: 'wallet id' })
  id: string;

  @ApiProperty({ description: 'name of the wallet' })
  name: string;

  @ApiProperty({ description: 'date of creation' })
  date: Date;
}
