import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/transaction.dto';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('order_drinks')
  findAll(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.getDrinks(createTransactionDto);
  }
}
