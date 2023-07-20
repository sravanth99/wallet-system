import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { FetchTransactionsInputDto } from '../dto';
import { Transaction } from 'src/schemas';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  @ApiOperation({ summary: 'Fetches transaction data for a given wallet' })
  async createTransaction(
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
