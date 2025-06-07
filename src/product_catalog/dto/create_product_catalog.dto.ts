import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';

export class CreateProductCatalogDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Nama produk',
  })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'Nama produk tidak boleh mengandung karakter khusus',
  })
  @Length(3, 50, {
    message:
      'Nama produk tidak boleh kurang dari 3 karakter dan lebih dari 50 karakter',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Harga produk',
  })
  @Min(500, {
    message: 'Harga tidak boleh kurang dari 500',
  })
  price: number;
}
