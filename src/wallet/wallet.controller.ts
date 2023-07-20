import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Schema } from 'mongoose';
import { StripWhitespacesPipe } from '../pipes';
import { validateObjectId } from '../utils';
import {
  FetchWalletResponseDto,
  TransactionInputDto,
  TransactionResponseDto,
  WalletSetupDto,
  WalletSetupResponseDto,
} from '../dto';
import { WalletService } from './wallet.service';

@ApiTags('Wallet')
@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  @Get('/wallet/:walletId')
  @ApiOperation({ summary: 'Fetch a wallet by its ID' })
  @ApiParam({
    name: 'walletId',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'found wallet',
    type: FetchWalletResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Wallet not found!' })
  async getWalletById(
    @Param('walletId', {
      transform: (value: string) => validateObjectId(value, 'walletId'),
    })
    walletId: Schema.Types.ObjectId,
  ) {
    const wallet = await this.walletService.getWalletById(walletId);
    if (!wallet) {
      throw new NotFoundException('Wallet Not Found!');
    }
    return wallet;
  }

  @Post('/setup')
  @ApiOperation({ summary: 'Setup a new wallet' })
  @ApiBody({ type: WalletSetupDto })
  @ApiResponse({
    status: 201,
    description: 'creates a new wallet on success with some initial balance',
    type: WalletSetupResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'wallet name already exists!',
  })
  async createWallet(@Body(StripWhitespacesPipe) walletDto: WalletSetupDto) {
    return this.walletService.createWallet(walletDto);
  }

  @Post('/transact/:walletId')
  @ApiOperation({ summary: 'Perform transaction (CREIDT/DEBIT) on a wallet' })
  @ApiParam({ name: 'walletId', type: String })
  @ApiBody({ type: TransactionInputDto })
  @ApiResponse({
    status: 201,
    description: 'CREDIT/DEBIT operation successful',
    type: TransactionResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Wallet not found!',
  })
  @ApiResponse({
    status: 403,
    description: 'Insufficient Funds :(',
  })
  transactWallet(
    @Param('walletId', {
      transform: (value: string) => validateObjectId(value, 'walletId'),
    })
    walletId: Schema.Types.ObjectId,
    @Body() transactionInput: TransactionInputDto,
  ) {
    return this.walletService.updateBalance(walletId, transactionInput);
  }
}
