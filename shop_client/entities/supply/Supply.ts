export interface Supply {
  id: number;
  panelId: number;
  items: SupplyItem[];
}

export interface SupplyItem {
  id: number;
  productId: number;
  count: number;
  supplyId: number;
}
