import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsNumber()
  cost!: number;

  @IsNumber()
  count!: number;

  @IsNumber()
  panelId!: number;
}

export class UpdateProductDto {
  @IsNumber()
  productId!: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  cost?: number;
}
