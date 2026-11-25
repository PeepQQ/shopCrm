export interface PanelSaleStatisticItem {
  total: number;
  date: {
    start: string;
    end: string;
  };
}

export type PanelStatisticsSplitType = 'day' | 'week' | 'month';
