import { Test, TestingModule } from '@nestjs/testing';
import { ProductCatalogService } from './product_catalog.service';
import { ProductCatalog } from './entities/product_catalog.entity';
import { getModelToken } from '@nestjs/sequelize';
import { UpdateProductCatalogDto } from './dto/update_product_catalog.dto';
// import { MockType } from '../utils/test.utils';

describe.only('ProductCatalogService', () => {
  let service: ProductCatalogService;
  // let mockProductCatalogRepository: MockType<typeof ProductCatalog>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductCatalogService,
        {
          provide: getModelToken(ProductCatalog),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ProductCatalogService>(ProductCatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update a product catalog', async () => {
    const id = '1';
    const dto: UpdateProductCatalogDto = {
      name: 'Product 1',
      price: 100000,
    };
    const result = await service.update(id, dto);
    expect(result).toEqual({ id, dto });
  });
});
