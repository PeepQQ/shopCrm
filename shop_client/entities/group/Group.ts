import { Product } from "../product";

export interface Group {
  id: number;
  name: string;
  children: Group[] | [];
  groupProducts: Product[] | [];
}
