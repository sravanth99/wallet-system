/* eslint-disable @typescript-eslint/no-empty-function */
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongoose';

import { TransactionService } from '../transaction';
import { Transaction, TransactionType, Wallet } from '../schemas';
import { WalletService } from './wallet.service';

import {
  TransactionInputDto,
  TransactionResponseDto,
  WalletSetupDto,
} from '../dto';

const mockWalletModel = function () {};
mockWalletModel.findById = jest.fn();
mockWalletModel.findOne = jest.fn();
mockWalletModel.session = jest.fn();
mockWalletModel.exec = jest.fn();
mockWalletModel.save = jest.fn();
mockWalletModel.balance = 100;
mockWalletModel.prototype.save = jest.fn();

const walletId = '60330ce44329433a20f25d45' as unknown as ObjectId;

const walletDto: WalletSetupDto = {
  name: 'My Wallet',
  balance: 100,
};

const mockWallet = {
  id: walletId,
  ...walletDto,
  date: new Date(),
} as unknown as Wallet;

const mockTransaction = {
  id: walletId,
  amount: 100,
  balance: 100,
  description: 'setup',
  type: TransactionType.CREDIT,
} as unknown as Transaction;

jest.mock('../utils', () => ({
  getSession: jest.fn(() => ({
    session: {
      withTransaction: async function (cb: () => void) {
        return cb();
      },
    },
    closeConnection: jest.fn(),
  })),
}));

describe('WalletService', () => {
  let walletService: WalletService;
  let transactionService: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        {
          provide: getModelToken(Wallet.name),
          useValue: mockWalletModel,
        },
        {
          provide: getConnectionToken(),
          useValue: {},
        },
        {
          provide: TransactionService,
          useValue: {
            createTransaction: jest.fn(),
          },
        },
      ],
    }).compile();

    walletService = module.get<WalletService>(WalletService);
    transactionService = module.get<TransactionService>(TransactionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getWalletById', () => {
    it('should return the wallet if it exists', async () => {
      mockWalletModel.findById.mockReturnThis();
      mockWalletModel.exec.mockResolvedValueOnce(mockWallet);

      const result = await walletService.getWalletById(walletId);

      expect(result).toEqual(mockWallet);
      expect(mockWalletModel.findById).toHaveBeenCalledWith(walletId);
    });

    it('should return null if the wallet does not exist', async () => {
      mockWalletModel.findById.mockReturnThis();
      mockWalletModel.exec.mockResolvedValueOnce(null);

      const result = await walletService.getWalletById(walletId);

      expect(result).toBeNull();
      expect(mockWalletModel.findById).toHaveBeenCalledWith(walletId);
    });
  });

  describe('createWallet', () => {
    it('should create a new wallet and transaction on success', async () => {
      mockWalletModel.prototype.save.mockResolvedValueOnce(mockWallet);
      jest
        .spyOn(transactionService, 'createTransaction')
        .mockResolvedValueOnce(mockTransaction);

      const result = await walletService.createWallet(walletDto);

      expect(result).toEqual({
        id: mockWallet.id,
        balance: walletDto.balance,
        transactionId: mockTransaction.id,
        name: walletDto.name,
        date: mockWallet.date,
      });

      expect(mockWalletModel.prototype.save).toHaveBeenCalledWith(
        expect.anything(),
      );
      expect(transactionService.createTransaction).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
      );
    });

    it('should handle duplicate wallet name and throw ForbiddenException', async () => {
      const mockError = new Error(
        'E11000 duplicate key error collection: test.wallets index: name_1 dup key: { name: "My Wallet" }',
      );
      mockWalletModel.prototype.save.mockRejectedValueOnce(mockError);

      await expect(walletService.createWallet(walletDto)).rejects.toThrowError(
        'My Wallet already exists!',
      );

      expect(mockWalletModel.prototype.save).toHaveBeenCalledWith(
        expect.anything(),
      );
    });

    it('should handle transaction creation error and throw error', async () => {
      const mockError = new Error('Transaction creation failed');
      mockWalletModel.prototype.save.mockResolvedValueOnce(mockWallet);
      jest
        .spyOn(transactionService, 'createTransaction')
        .mockRejectedValueOnce(mockError);

      await expect(walletService.createWallet(walletDto)).rejects.toThrowError(
        'Transaction creation failed',
      );

      expect(mockWalletModel.prototype.save).toHaveBeenCalledWith(
        expect.anything(),
      );
      expect(transactionService.createTransaction).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
      );
    });
  });

  describe('updateBalance', () => {
    it('should update wallet balance and create transaction for CREDIT type', async () => {
      const transactionInput: TransactionInputDto = {
        amount: 50,
        description: 'Credit transaction',
        type: TransactionType.CREDIT,
      };

      mockWalletModel.findOne.mockReturnThis();
      mockWalletModel.session.mockReturnThis();
      mockWalletModel.save = jest.fn().mockResolvedValueOnce(mockWallet);
      jest
        .spyOn(transactionService, 'createTransaction')
        .mockResolvedValueOnce(mockTransaction);

      const result: TransactionResponseDto = await walletService.updateBalance(
        mockWallet.id,
        transactionInput,
      );

      expect(result).toEqual({
        balance: mockTransaction.balance,
        transactionId: walletId,
      });
      expect(mockWalletModel.findOne).toHaveBeenCalledWith({
        _id: mockWallet.id,
      });
      expect(mockWalletModel.save).toHaveBeenCalled();
      expect(transactionService.createTransaction).toHaveBeenCalledWith(
        {
          walletId: mockWallet.id,
          amount: transactionInput.amount,
          balance: mockWallet.balance,
          description: transactionInput.description,
          type: TransactionType.CREDIT,
        },
        expect.anything(),
      );
    });
  });
});
