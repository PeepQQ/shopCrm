import type { Panel } from "@/entities/panel";
import { Product } from "@/entities/product";
import axios, { type AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

interface CreateProductData {
  name: string;
  cost: number;
  count?: number;
  panelId: number;
}

export const createProduct = async (
  data: CreateProductData,
): Promise<AxiosResponse<Product>> => {
  return await api.post("/admin/product/create", data);
};
