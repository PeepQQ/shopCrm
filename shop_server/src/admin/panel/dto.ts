import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class PanelCreateDto {
  @IsString()
  name!: string;
}

export class PanelProducts {
  @IsNumber()
  panelId!: number;
}

export class CreatePanelSupplyDto {
  @IsNumber()
  productId!: number;

  @IsNumber()
  count!: number;

  @IsOptional()
  supplyId?: number;
}
