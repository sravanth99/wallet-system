import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Transaction } from '../schemas';
import { InternalServerErrorException } from '@nestjs/common';
import { FetchTransactionsInputDto } from '../dto';

const mockTransactionService = {
  fetchTransactions: jest.fn(),
};

const query: FetchTransactionsInputDto = {
  walletId: '60330ce44329433a20f25d45',
  skip: 0,
  limit: 10,
};

describe('TransactionController', () => {
  let controller: TransactionController;
  const mockTransactions: Transaction[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionService,
          useValue: mockTransactionService,
        },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchTransactions', () => {
    it('should fetch transactions and return data', async () => {
      mockTransactionService.fetchTransactions.mockResolvedValueOnce(
        mockTransactions,
      );

      const result = await controller.fetchTransactions(query);

      expect(result).toEqual(mockTransactions);
      expect(mockTransactionService.fetchTransactions).toHaveBeenCalledWith(
        query,
      );
    });

    it('should throw an InternalServerErrorException if an error occurs', async () => {
      mockTransactionService.fetchTransactions.mockRejectedValueOnce(
        new Error(),
      );

      await expect(controller.fetchTransactions(query)).rejects.toThrow(
        InternalServerErrorException,
      );

      expect(mockTransactionService.fetchTransactions).toHaveBeenCalledWith(
        query,
      );
    });
  });
});
