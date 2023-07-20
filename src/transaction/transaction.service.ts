import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { FetchTransactionsInputDto } from 'src/dto';
import { Transaction } from '../schemas';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}

  fetchTransactions(query: FetchTransactionsInputDto) {
    const { walletId, skip, limit } = query;

    return this.transactionModel
      .find({ walletId })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  createTransaction(
    transactionInputDto: Partial<Transaction>,
    session?: ClientSession,
  ): Promise<Transaction> {
    const newTransaction = new this.transactionModel(transactionInputDto);
    return newTransaction.save({ session });
  }
}
