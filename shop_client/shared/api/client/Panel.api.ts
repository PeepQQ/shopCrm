import type { Panel } from "@/entities/panel";
import { Product } from "@/entities/product";
import axios, { type AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const getPanelsList = async (): Promise<AxiosResponse<Panel[]>> => {
  return await api.get("/admin/panel/list");
};

interface CreatePanelData {
  name: string;
}

export const createPanel = async (
  data: CreatePanelData,
): Promise<AxiosResponse<boolean>> => {
  return await api.post("/admin/panel/create", data);
};

export const getPanelProducts = async (
  panelId: string,
): Promise<AxiosResponse<Product[]>> => {
  return await api.get(`/admin/panel/${panelId}/panelProducts`);
};
