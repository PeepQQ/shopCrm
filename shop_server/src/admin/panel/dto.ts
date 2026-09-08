import { IsNumber } from "class-validator";

export interface PanelCreateData {
  name: string;
}

export class PanelProducts {
  @IsNumber()
  panelId!: number;
}