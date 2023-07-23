import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, ObjectId, Schema } from 'mongoose';
import { TransactionService } from '../transaction';
import { TransactionType, Wallet } from '../schemas';
import {
  TransactionInputDto,
  TransactionResponseDto,
  WalletSetupDto,
  WalletSetupResponseDto,
} from '../dto';
import { getSession } from '../utils';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<Wallet>,
    @InjectConnection() private readonly connection: Connection,
    private readonly transactionService: TransactionService,
  ) {}

  /**
   * Retrieves a wallet by its ID.
   * @param {Schema.Types.ObjectId} walletId - The ID of the wallet.
   * @returns {Promise<Wallet | null>} - A promise that resolves to the found Wallet document or null if not found.
   */
  async getWalletById(walletId: Schema.Types.ObjectId): Promise<Wallet | null> {
    return this.walletModel.findById(walletId).exec();
  }

  /**
   * Creates a new wallet with the provided initial balance and performs a credit transaction.
   * @param {WalletSetupDto} walletDto - The data for setting up the new wallet.
   * @returns {Promise<WalletSetupResponseDto>} - A promise that resolves to the setup response containing the wallet ID, balance, and transaction ID.
   * @throws {ForbiddenException} - If the wallet name already exists.
   */
  async createWallet(
    walletDto: WalletSetupDto,
  ): Promise<WalletSetupResponseDto> {
    const { session } = await getSession(this.connection);
    let walletSetupResponse: WalletSetupResponseDto;
    try {
      await session.withTransaction(async () => {
        const {
          balance,
          name,
          date,
          id: walletId,
        } = await new this.walletModel(walletDto).save({
          session,
        });

        const { id: transactionId } =
          await this.transactionService.createTransaction(
            {
              amount: balance,
              balance,
              description: 'setup',
              walletId,
              type: TransactionType.CREDIT,
            },
            session,
          );

        walletSetupResponse = {
          id: walletId,
          balance,
          transactionId,
          name,
          date,
        };
      });
    } catch (err) {
      if (err instanceof Error) {
        const { message } = err;
        if (
          message.includes(`duplicate key error collection`) &&
          message.includes(`index: name_1 dup key`)
        ) {
          throw new ForbiddenException(`${walletDto.name} already exists!`);
        }
        throw err;
      }
    }
    return walletSetupResponse;
  }

  /**
   * Updates the balance of a wallet and creates a new transaction based on the transaction input.
   * @param {ObjectId} walletId - The ID of the wallet to update the balance.
   * @param {TransactionInputDto} transactionInput - The transaction details (amount, description, and type).
   * @returns {Promise<TransactionResponseDto>} - A promise that resolves to the transaction response containing the updated balance and transaction ID.
   * @throws {NotFoundException} - If the wallet is not found.
   * @throws {ForbiddenException} - If there are insufficient funds for the transaction.
   */
  async updateBalance(
    walletId: ObjectId,
    transactionInput: TransactionInputDto,
  ): Promise<TransactionResponseDto> {
    const { session } = await getSession(this.connection);
    let transactionResponse: TransactionResponseDto;

    try {
      await session.withTransaction(async () => {
        const res = await this.walletModel
          .findOne({ _id: walletId })
          .session(session);
        const { amount, description, type } = transactionInput;
        if (!res) {
          throw new NotFoundException('Wallet Not Found!');
        }
        res.balance += type === TransactionType.CREDIT ? amount : -amount;

        const updatedWallet = await res.save({ session });

        const transactionCreateData = {
          walletId,
          amount,
          balance: updatedWallet.balance,
          description,
          type,
        };

        const { balance, id: transactionId } =
          await this.transactionService.createTransaction(
            transactionCreateData,
            session,
          );
        transactionResponse = {
          balance,
          transactionId,
        };
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        const { name } = err;
        if (name === 'ValidationError') {
          throw new ForbiddenException('Insufficient funds :(');
        } else {
          throw err;
        }
      }
    }
    return transactionResponse;
  }
}
