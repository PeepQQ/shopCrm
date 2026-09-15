import { Product } from "../product";

export interface Group {
  id: number;
  name: string;
  children: Group[] | [];
  groupProducts: Product[] | [];
  type: GroupType;
}

export enum GroupType {
  PARENT = "PARENT",
  FOLDER = "FOLDER",
}
