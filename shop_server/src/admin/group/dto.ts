import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsNumber()
  parentId!: number;

  @IsString()
  name!: string;

  @IsNumber()
  panelId!: number;
}

export class GetGroupListDto {
  @IsNumber()
  panelId!: number;
}

export class ConnectDisconnectProductDto {
  @Type(() => Number)
  @IsNumber()
  groupId!: number;

  @Type(() => Number)
  @IsNumber()
  productId!: number;
}

export class GetGroupProducts {
  @Type(() => Number)
  @IsNumber()
  groupId!: number;
}
