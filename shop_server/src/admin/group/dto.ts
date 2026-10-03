import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsEnum } from 'class-validator';
import { GroupType } from 'src/generated/prisma/enums';

export class CreateGroupDto {
  @IsOptional()
  @IsNumber()
  parentId?: number | null = null;

  @IsString()
  name!: string;

  @IsNumber()
  panelId!: number;

  @IsEnum(GroupType)
  type!: GroupType;
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

export class DeleteGroupDto {
  @Type(() => Number)
  @IsNumber()
  groupId!: number;
}

export class ChangeParentDto {
  @IsNumber()
  groupId!: number;

  @IsOptional()
  @IsNumber()
  parentId!: number | null;

  @IsNumber()
  index!: number;
}
