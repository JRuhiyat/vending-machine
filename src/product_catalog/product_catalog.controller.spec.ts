import { Test, TestingModule } from '@nestjs/testing';
import { ProductCatalogController } from './product_catalog.controller';
import { ProductCatalogService } from './product_catalog.service';
import { createMock, MockType } from '../utils/test.utils';
import { getModelToken } from '@nestjs/sequelize';
import { ProductCatalog } from './entities/product_catalog.entity';

describe('ProductCatalogController', () => {
  let controller: ProductCatalogController;
  let mockProductCatalogService: MockType<typeof ProductCatalog>;
  const mockProductCatalog = [
    {
      id: 1,
      name: 'Aqua',
      price: 2000,
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCatalogController],
      providers: [
        ProductCatalogService,
        {
          provide: getModelToken(ProductCatalog),
          useValue: createMock(),
        },
      ],
    }).compile();

    controller = module.get<ProductCatalogController>(ProductCatalogController);
    mockProductCatalogService = module.get(getModelToken(ProductCatalog));
    mockProductCatalogService.findAll.mockResolvedValue(
      mockProductCatalog as never,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
