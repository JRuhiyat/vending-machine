import { PartialType } from '@nestjs/swagger';
import { CreateProductCatalogDto } from './create_product_catalog.dto';

export class UpdateProductCatalogDto extends PartialType(
  CreateProductCatalogDto,
) {}
