import axios, { type AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

interface InviteUserData {
  email: string;
  redirectUrl?: string;
}

export const inviteUser = async (
  data: InviteUserData,
): Promise<AxiosResponse<boolean>> => {
  return await api.post("/user/invite", data);
};

interface InviteUserConfirmData {
  token: string;
  name: string;
  password: string;
}

export const inviteUserConfirm = async (
  data: InviteUserConfirmData,
): Promise<AxiosResponse<boolean>> => {
  return await api.post("/user/inviteConfirm", data);
};
