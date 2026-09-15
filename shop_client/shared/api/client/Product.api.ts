import type { Panel } from "@/entities/panel";
import { Product } from "@/entities/product";
import axios, { type AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

interface CreateUpdateProductData {
  name: string;
  cost: number;
  panelId: number;
}

export const createProduct = async (
  data: CreateUpdateProductData,
): Promise<AxiosResponse<Product>> => {
  return await api.post("/admin/product/create", data);
};

export const updateProduct = async (
  data: CreateUpdateProductData,
): Promise<AxiosResponse<Product>> => {
  return await api.post("/admin/product/update", data);
};
