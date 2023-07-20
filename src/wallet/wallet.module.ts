import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from '../transaction';
import { Wallet, WalletSchema } from '../schemas';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
    TransactionModule,
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
