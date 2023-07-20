/* eslint-disable @typescript-eslint/no-empty-function */
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { Transaction } from '../schemas';
import { FetchTransactionsInputDto } from '../dto';
import { ObjectId } from 'mongoose';

const walletId = '60330ce44329433a20f25d45' as unknown as ObjectId;

const mockTransactionModel = function () {};

mockTransactionModel.find = jest.fn().mockReturnThis();
mockTransactionModel.sort = jest.fn().mockReturnThis();
mockTransactionModel.skip = jest.fn().mockReturnThis();
mockTransactionModel.limit = jest.fn().mockReturnThis();
mockTransactionModel.exec = jest.fn();
mockTransactionModel.prototype.save = jest.fn();

const mockTransactions = [];

const mockCreatedTransaction = {};

describe('TransactionService', () => {
  let transactionService: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getModelToken(Transaction.name),
          useValue: mockTransactionModel,
        },
      ],
    }).compile();

    transactionService = module.get<TransactionService>(TransactionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchTransactions', () => {
    it('should fetch transactions with correct query parameters', async () => {
      const query: FetchTransactionsInputDto = {
        walletId: '60330ce44329433a20f25d45',
        skip: 0,
        limit: 10,
      };

      mockTransactionModel.exec.mockResolvedValueOnce(mockTransactions);

      const result = await transactionService.fetchTransactions(query);

      expect(result).toEqual(mockTransactions);
      expect(mockTransactionModel.find).toHaveBeenCalledWith({
        walletId: query.walletId,
      });
      expect(mockTransactionModel.sort).toHaveBeenCalledWith({ date: 'desc' });
      expect(mockTransactionModel.skip).toHaveBeenCalledWith(query.skip);
      expect(mockTransactionModel.limit).toHaveBeenCalledWith(query.limit);
      expect(mockTransactionModel.exec).toHaveBeenCalled();
    });
  });

  describe('createTransaction', () => {
    it('should create a new transaction with provided data', async () => {
      const transactionInputDto: Partial<Transaction> = {
        walletId,
        amount: 100,
        description: 'Sample transaction',
      };

      mockTransactionModel.prototype.save.mockResolvedValueOnce(
        mockCreatedTransaction,
      );

      const result = await transactionService.createTransaction(
        transactionInputDto,
      );

      expect(result).toEqual(mockCreatedTransaction);
      expect(mockTransactionModel.prototype.save).toHaveBeenCalledWith({
        session: undefined,
      });
    });
  });
});
