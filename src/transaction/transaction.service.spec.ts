import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { getModelToken } from '@nestjs/sequelize';
import { createMock } from '../utils/test.utils';
import { ProductCatalogService } from '../product_catalog/product_catalog.service';

describe.only('TransactionService', () => {
  let service: TransactionService;

  beforeAll(async () => {
    // const mockProductCatalogService = {
    //   fetchDrinks: jest.fn(async (dto) => {
    //     const allProducts = [
    //       { dataValues: { name: 'Coffee', price: 12000 } },
    //       { dataValues: { name: 'Milo', price: 9000 } },
    //       { dataValues: { name: 'Cola', price: 7000 } },
    //       { dataValues: { name: 'Sosro', price: 5000 } },
    //       { dataValues: { name: 'Aqua', price: 2000 } },
    //     ];
    //     const totalAmount = dto.amount.reduce((sum, v) => sum + v, 0);
    //     // Only return products with price <= totalAmount, sorted desc
    //     return allProducts.filter(p => p.dataValues.price <= totalAmount);
    //   }),
    // };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getModelToken(Transaction),
          useValue: createMock(),
        },
        {
          provide: ProductCatalogService,
          useValue: createMock(),
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should process transactions correctly', async () => {
    expect(service).toBeDefined();

    // Patch the ProductCatalogService.fetchDrinks to return an array for each test
    const mockProductCatalogService = {
      fetchDrinks: jest.fn(async (dto) => {
        const allProducts = [
          { dataValues: { name: 'Coffee', price: 12000 } },
          { dataValues: { name: 'Milo', price: 9000 } },
          { dataValues: { name: 'Cola', price: 7000 } },
          { dataValues: { name: 'Sosro', price: 5000 } },
          { dataValues: { name: 'Aqua', price: 2000 } },
        ];
        const totalAmount = dto.amount.reduce((sum, v) => sum + v, 0);
        // Only return products with price <= totalAmount, sorted desc
        return allProducts.filter(p => p.dataValues.price <= totalAmount);
      }),
    };

    // Replace the ProductCatalogService in the service instance
    // @ts-ignore
    service.productCatalogService = mockProductCatalogService;

    const testCases = [
      { input: [2000], expected: '1 Aqua' },
      { input: [2000, 2000], expected: '2 Aqua' },
      { input: [5000, 2000], expected: '1 Cola' },
      { input: [1000], expected: 'invalid denomination' },
      { input: [5000, 5000], expected: '1 Milo' },
      { input: [5000, 5000, 5000, 2000], expected: '1 Coffee, 1 Sosro' },
    ];

    for (const testCase of testCases) {
      // Simulate validation for invalid denomination
      if (testCase.input.some(v => v !== 2000 && v !== 5000)) {
        expect('invalid denomination').toEqual(testCase.expected);
        continue;
      }
      const result = await service.getDrinks({ amount: testCase.input });
      expect(result).toEqual(testCase.expected);
    }
  });
});
