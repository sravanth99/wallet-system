import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { FetchTransactionsInputDto } from '../dto';
import { Transaction } from 'src/schemas';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  @ApiOperation({ summary: 'Fetches transaction data for a given wallet' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched transactions',
    type: Transaction,
    isArray: true,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async fetchTransactions(
    @Query() query: FetchTransactionsInputDto,
  ): Promise<Transaction[]> {
    try {
      const transactionsData = await this.transactionService.fetchTransactions(
        query,
      );

      return transactionsData;
    } catch (err) {
      throw new InternalServerErrorException('Something Went Wrong!');
    }
  }
}
