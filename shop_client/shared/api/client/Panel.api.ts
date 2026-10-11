import type { Panel } from "@/entities/panel";
import { Product } from "@/entities/product";
import { SupplyItem } from "@/entities/supply";
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
): Promise<AxiosResponse<Panel>> => {
  return await api.post("/admin/panel/create", data);
};

export const getPanelProducts = async (
  panelId: string,
): Promise<AxiosResponse<Product[]>> => {
  return await api.get(`/admin/panel/${panelId}/panelProducts`);
};

interface CreatePanelSupplyData {
  panelId: string;
  items: SupplyItem[];
}

export const createPanelSupply = async (
  data: CreatePanelSupplyData,
): Promise<AxiosResponse<boolean>> => {
  return await api.post(
    `/admin/panel/${data.panelId}/createSupply`,
    data.items,
  );
};
