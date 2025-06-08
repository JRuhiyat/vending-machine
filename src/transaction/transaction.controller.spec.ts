import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { ProductCatalogService } from '../product_catalog/product_catalog.service';
import { createMock } from '../utils/test.utils';
import { getModelToken } from '@nestjs/sequelize';
import { Transaction } from './entities/transaction.entity';

describe.only('Transaction', () => {
  let controller: TransactionController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        TransactionService,
        {
          provide: ProductCatalogService,
          useValue: {}, // Provide a mock or empty object for ProductCatalogService
        },
        {
          provide: getModelToken(Transaction),
          useValue: createMock(),
        },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
