import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { FetchTransactionsInputDto } from '../dto';
import { Transaction } from '../schemas';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
  ) {}

  /**
   * Fetches a list of transactions associated with a specific wallet in descedning order by date of transaction.
   * @param {FetchTransactionsInputDto} query - `(walletId, limit, and skip)` The query parameters for fetching transactions.
   * @returns {Promise<Transaction[]>} - A promise that resolves to an array of Transaction documents representing the fetched transactions.
   */
  fetchTransactions(query: FetchTransactionsInputDto) {
    const { walletId, skip, limit } = query;

    return this.transactionModel
      .find({ walletId })
      .sort({
        date: 'desc',
      })
      .skip(skip)
      .limit(limit)
      .exec();
  }

  /**
   * Creates a new transaction associated with a specific wallet.
   * @param {Partial<Transaction>} transactionInputDto - The transaction details to be saved.
   * @param {ClientSession} [session] - Optional Mongoose ClientSession for transaction support.
   * @returns {Promise<Transaction>} - A promise that resolves to the newly created Transaction document representing the transaction.
   */
  createTransaction(
    transactionInputDto: Partial<Transaction>,
    session?: ClientSession,
  ): Promise<Transaction> {
    const newTransaction = new this.transactionModel(transactionInputDto);
    return newTransaction.save({ session });
  }
}
