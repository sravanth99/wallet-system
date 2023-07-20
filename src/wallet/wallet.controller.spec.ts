import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongoose';

import {
  WalletSetupDto,
  TransactionInputDto,
  TransactionResponseDto,
  WalletSetupResponseDto,
} from '../dto';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { Wallet } from '../schemas';

const mockWalletId = 'mock-id' as unknown as ObjectId;

beforeAll(() => {
  jest.clearAllMocks();
});
afterAll(() => {
  jest.clearAllMocks();
});

describe('WalletController', () => {
  let walletController: WalletController;
  let walletService: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        {
          provide: WalletService,
          useValue: {
            createWallet: jest.fn(),
            updateBalance: jest.fn(),
            getWalletById: jest.fn(),
          },
        },
      ],
    }).compile();

    walletController = module.get<WalletController>(WalletController);
    walletService = module.get<WalletService>(WalletService);
  });

  describe('createWallet', () => {
    it('should create a new wallet and return the wallet', async () => {
      const mockWalletDto: WalletSetupDto = {
        balance: 100,
        name: 'Test Wallet',
      };
      const mockCreatedWallet = {
        ...mockWalletDto,
        id: 'mock-wallet-id',
        date: new Date(),
      } as WalletSetupResponseDto;

      jest
        .spyOn(walletService, 'createWallet')
        .mockResolvedValue(mockCreatedWallet);

      const result = await walletController.createWallet(mockWalletDto);

      expect(result).toEqual(mockCreatedWallet);
      expect(walletService.createWallet).toHaveBeenCalledWith(mockWalletDto);
    });
  });

  describe('getWalletById', () => {
    it('should fetch a wallet by its ID', async () => {
      const mockWallet = {
        id: mockWalletId,
        balance: 500,
        name: 'Test Wallet',
        date: new Date(),
      } as unknown as Wallet;

      jest.spyOn(walletService, 'getWalletById').mockResolvedValue(mockWallet);

      const result = await walletController.getWalletById(mockWalletId);

      expect(result).toEqual(mockWallet);
      expect(walletService.getWalletById).toHaveBeenCalledWith(mockWalletId);
    });

    it('should throw NotFoundException if wallet is not found', async () => {
      jest.spyOn(walletService, 'getWalletById').mockResolvedValue(null);

      await expect(
        walletController.getWalletById(mockWalletId),
      ).rejects.toThrowError(NotFoundException);
      expect(walletService.getWalletById).toHaveBeenCalledWith(mockWalletId);
    });
  });

  describe('transactWallet', () => {
    it('should perform a transaction (CREDIT/DEBIT) on a wallet and return the transaction response', async () => {
      const mockTransactionInput: TransactionInputDto = {
        amount: 50,
        description: 'Test Transaction',
        type: 'CREDIT',
      };
      const mockTransactionResponse: TransactionResponseDto = {
        balance: 150,
        transactionId: 'mock-transaction-id',
      };

      jest
        .spyOn(walletService, 'updateBalance')
        .mockResolvedValue(mockTransactionResponse);

      const result = await walletController.transactWallet(
        mockWalletId,
        mockTransactionInput,
      );

      expect(result).toEqual(mockTransactionResponse);
      expect(walletService.updateBalance).toHaveBeenCalledWith(
        mockWalletId,
        mockTransactionInput,
      );
    });
  });
});
