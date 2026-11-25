import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { type PanelStatisticsSplitType } from 'src/types';

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
}

export class GetPanelSaleStatisticsDto {
  @IsString()
  dateStart!: string;

  @IsString()
  dateEnd!: string;

  @IsString()
  splitType!: PanelStatisticsSplitType;
}
