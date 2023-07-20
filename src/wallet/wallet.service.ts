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

  async getWalletById(walletId: Schema.Types.ObjectId): Promise<Wallet | null> {
    return this.walletModel.findById(walletId).exec();
  }

  async createWallet(
    walletDto: WalletSetupDto,
  ): Promise<WalletSetupResponseDto> {
    const { session, closeConnection } = await getSession(this.connection);
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
      await closeConnection();
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

  async updateBalance(
    walletId: ObjectId,
    transactionInput: TransactionInputDto,
  ): Promise<TransactionResponseDto> {
    const { session, closeConnection } = await getSession(this.connection);
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
      await closeConnection();
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
