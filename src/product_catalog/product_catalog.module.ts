import { Module } from '@nestjs/common';
import { ProductCatalogService } from './product_catalog.service';
import { ProductCatalogController } from './product_catalog.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductCatalog } from './entities/product_catalog.entity';

@Module({
  imports: [SequelizeModule.forFeature([ProductCatalog])],
  controllers: [ProductCatalogController],
  providers: [ProductCatalogService],
  exports: [ProductCatalogService],
})
export class ProductCatalogModule {}
