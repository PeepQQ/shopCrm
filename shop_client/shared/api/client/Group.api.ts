import { Group } from "@/entities/group";
import { GroupType } from "@/entities/group/Group";
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
  return await api.post(
    `/admin/group/${groupId}/disconnectProduct/${productId}`,
  );
};

interface CreateGroupData {
  name: string;
  panelId: number;
  parentId?: number;
  type: GroupType;
}

export const createGroup = async (
  data: CreateGroupData,
): Promise<AxiosResponse<Group>> => {
  console.log(data);
  return await api.post(`/admin/group/create`, data);
};
