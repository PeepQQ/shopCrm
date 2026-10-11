import { Decimal } from '@prisma/client/runtime/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDecimal,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SaleItemDto {
  @IsNumber()
  productId!: number;

  @IsNumber()
  count!: number;

  @IsNumber()
  discountPercent!: number;

  @IsDecimal()
  price!: Decimal;
}

export class CreateSaleDto {
  @IsNumber()
  panelId!: number;

  @IsArray()
  saleItems!: SaleItemDto[];
}

export class SalesHistoryQuery {
  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  dateStart?: string;

  @IsOptional()
  @IsString()
  dateEnd?: string;
}
