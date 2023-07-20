import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, Min, IsString, MinLength } from 'class-validator';
import { trimWhiteSpaces } from '../utils';

export class WalletSetupDto {
  @ApiProperty({
    name: 'balance',
    minimum: 0,
    description: 'initial wallet balance',
  })
  @Min(0, { message: 'balance must be a non negative number' })
  @IsNumber()
  balance: number;

  @ApiProperty({ name: 'name', description: 'wallet name', minLength: 3 })
  @MinLength(3, { message: 'Wallet Name must be 3 character long' })
  @Transform(({ value }: { value: string }) => trimWhiteSpaces(value))
  @IsString({ message: 'Wallet Name must be a string' })
  name: string;
}
