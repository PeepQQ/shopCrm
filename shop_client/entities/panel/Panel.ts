export interface Panel {
  id: number;
  name: string;
}

export interface PanelSaleStatisticItem {
  total: number;
  date: {
    start: string;
    end: string;
  };
}

export type PanelStatisticsSplitType = "day" | "week" | "month";
