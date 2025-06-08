import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsNumber,
  IsIn,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @IsIn([2000, 5000], { each: true, message: 'invalid denomination' })
  @ApiProperty({
    type: [Number],
    description: 'Uang, only 2000 or 5000 allowed, e.g. [5000, 2000]',
    example: [5000, 2000],
  })
  amount: number[];
}
