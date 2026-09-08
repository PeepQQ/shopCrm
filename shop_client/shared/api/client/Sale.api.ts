import axios, { type AxiosResponse } from "axios";
import type { SaleForAPI } from "@/entities/sale";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const createSale = async (
  data: SaleForAPI,
): Promise<AxiosResponse<boolean>> => {
  return await api.post("/admin/sale/create", data);
};
