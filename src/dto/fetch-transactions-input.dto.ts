import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId, Max, Min } from 'class-validator';

export class FetchTransactionsInputDto {
  @ApiProperty({
    description: 'id of the wallet',
  })
  @IsMongoId()
  walletId: string;

  @ApiProperty({
    description: '# records limit',
    minimum: 1,
    maximum: 500,
    type: Number,
  })
  @IsInt()
  @Max(500)
  @Min(1)
  limit: number;

  @ApiProperty({
    description: '# records to skip',
    minimum: 0,
    type: Number,
  })
  @IsInt()
  @Min(0)
  skip: number;
}
