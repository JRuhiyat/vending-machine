import { Injectable } from '@nestjs/common';
import { CreateProductCatalogDto } from './dto/create_product_catalog.dto';
import { UpdateProductCatalogDto } from './dto/update_product_catalog.dto';
import { ProductCatalog } from './entities/product_catalog.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductCatalogService {
  constructor(
    @InjectModel(ProductCatalog)
    private productCatalogRepository: typeof ProductCatalog,
  ) {}

  async findAll() {
    const productCatalog = await this.productCatalogRepository.findAll({
      order: [['name', 'ASC']],
    });
    return productCatalog;
  }

  async findOne(id: string) {
    const productCatalog = await this.productCatalogRepository.findByPk(id);
    return productCatalog;
  }

  async create(createProductCatalogDto: CreateProductCatalogDto) {
    const productCatalog = await this.productCatalogRepository.create(
      createProductCatalogDto as any,
    );
    return productCatalog;
  }

  async update(id: string, updateProductCatalogDto: UpdateProductCatalogDto) {
    const productCatalog = await this.productCatalogRepository.update(
      updateProductCatalogDto,
      { where: { id } },
    );
    return productCatalog;
  }

  async remove(id: string) {
    const productCatalog = await this.productCatalogRepository.destroy({
      where: { id },
    });
    return productCatalog;
  }
}
