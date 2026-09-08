import { Product } from "../product";

export interface SaleItem {
  id?: number;
  count: number;
  discountPercent: number;
  price: number;

  product: Product;
}

export interface SaleItemForAPI {
  productId: number;
  count: number;
  discountPercent: number;
  price: number;
}

export interface Sale {
  id: number;
  panelId: number;
  createdAt: string;
  total: string;
  saleItems: SaleItem[];
}

export interface SaleForAPI {
  panelId: number;
  saleItems: SaleItemForAPI[];
}
