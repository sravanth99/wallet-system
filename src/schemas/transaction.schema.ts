import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { setPrecision } from '../utils';
import { TransactionType } from './tranasaction-type';

@Schema()
export class Transaction extends Document {
  @Prop({
    required: true,
    set: (val: number) => setPrecision(val),
    get: (val: number) => setPrecision(val),
  })
  balance: number;

  @ApiProperty({
    description: 'transaction amount',
  })
  @Prop({
    required: true,
    min: 0,
    set: (val: number) => setPrecision(val),
    get: (val: number) => setPrecision(val),
  })
  amount: number;

  @ApiProperty({
    description: 'wallet id to which this transaction is related',
  })
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId })
  walletId: MongooseSchema.Types.ObjectId;

  @ApiProperty({
    description: 'remarks',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    description: 'type of the transaction',
    enum: TransactionType,
  })
  @Prop({
    required: true,
    enum: ['CREDIT', 'DEBIT'],
  })
  type: string;

  @Prop({ default: () => new Date() })
  date: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
