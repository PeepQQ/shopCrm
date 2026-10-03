import { IsNumber, IsString } from 'class-validator';

export class PanelCreateDto {
  @IsString()
  name!: string;
}

export class PanelProducts {
  @IsNumber()
  panelId!: number;
}
