import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Delete,
  Post,
} from '@nestjs/common';
import { ProductCatalogService } from './product_catalog.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateProductCatalogDto } from './dto/update_product_catalog.dto';
import { CreateProductCatalogDto } from './dto/create_product_catalog.dto';

@ApiTags('ProductCatalog')
@Controller('product_catalog')
export class ProductCatalogController {
  constructor(private readonly productCatalogService: ProductCatalogService) {}

  @Get()
  findAll() {
    return this.productCatalogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCatalogService.findOne(id);
  }

  @Post()
  create(@Body() createProductCatalogDto: CreateProductCatalogDto) {
    return this.productCatalogService.create(createProductCatalogDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductCatalogDto: UpdateProductCatalogDto,
  ) {
    return this.productCatalogService.update(id, updateProductCatalogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCatalogService.remove(id);
  }
}
