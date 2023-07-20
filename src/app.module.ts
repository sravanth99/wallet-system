import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { WalletModule } from './wallet';
import { TransactionModule } from './transaction';

@Module({
  imports: [
    WalletModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    TransactionModule,
  ],
  providers: [AppService],
})
export class AppModule {}
