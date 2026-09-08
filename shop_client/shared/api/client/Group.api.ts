import { Group } from "@/entities/group";
import axios, { type AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const getPanelGroups = async (
  panelId: number,
): Promise<AxiosResponse<Group[]>> => {
  return await api.get(`/admin/group/${panelId}`);
};

export const connectProduct = async (
  groupId: number,
  productId: number,
): Promise<AxiosResponse<Group[]>> => {
  return await api.post(`/admin/group/${groupId}/connectProduct/${productId}`);
};

export const disconnectProduct = async (
  groupId: number,
  productId: number,
): Promise<AxiosResponse<Group[]>> => {
  return await api.post(`/admin/group/${groupId}/disconnectProduct/${productId}`);
};