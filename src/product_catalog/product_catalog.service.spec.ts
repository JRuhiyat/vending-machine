import { Test, TestingModule } from '@nestjs/testing';
import { ProductCatalogService } from './product_catalog.service';
import { ProductCatalog } from './entities/product_catalog.entity';
import { getModelToken } from '@nestjs/sequelize';
import { createMock } from '../utils/test.utils';

describe.only('ProductCatalogService', () => {
  let service: ProductCatalogService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductCatalogService,
        {
          provide: getModelToken(ProductCatalog),
          useValue: createMock(),
        },
      ],
    }).compile();

    service = module.get<ProductCatalogService>(ProductCatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
