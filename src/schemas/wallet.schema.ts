import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { setPrecision } from '../utils';

@Schema()
export class Wallet extends Document {
  @ApiProperty({ description: 'should be unique' })
  @Prop({ required: true, unique: true })
  name: string;

  @ApiProperty({
    description: 'must be a positive number',
  })
  @Prop({
    required: true,
    get: (val: number) => setPrecision(val),
    set: (val: number) => setPrecision(val),
    min: 0,
  })
  balance: number;

  @Prop({ default: () => new Date() })
  date: Date;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
