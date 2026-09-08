import { Decimal } from '@prisma/client/runtime/client';
import { Type } from 'class-transformer';
import { IsArray, IsDecimal, IsNumber } from 'class-validator';

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

export class SalesListDto {
  @Type(() => Number)
  @IsNumber()
  panelId!: number;
}
