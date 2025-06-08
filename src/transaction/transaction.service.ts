import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ProductCatalogService } from '../product_catalog/product_catalog.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction)
    private transactionRepository: typeof Transaction,
    private readonly productCatalogService: ProductCatalogService,
  ) {}

  async getDrinks(createTransactionDto: CreateTransactionDto) {
    const totalAmount = createTransactionDto.amount.reduce((sum, v) => sum + v, 0);
    const productCatalog = await this.productCatalogService.fetchDrinks(createTransactionDto);

    let remaining = totalAmount;
    let result: { name: string, count: number }[] = [];

    for (const product of productCatalog) {
      const price = product.dataValues.price;
      const count = Math.floor(remaining / price);
      if (count > 0) {
        result.push({ name: product.dataValues.name, count });
        remaining -= count * price;
      }
    }

    if (result.length === 0) return '';
    return result.map(r => `${r.count} ${r.name}`).join(', ');
  }
}
