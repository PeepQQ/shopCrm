import { UserData } from "@/entities/user";
import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const getMe = async (): Promise<AxiosResponse<UserData>> => {
  return api.get("/auth/me");
};

export const refresh = async (): Promise<AxiosResponse<UserData>> => {
  return api.get("/auth/refresh");
};

interface loginData {
  email: string;
  password: string;
}

export const login = async (data: loginData): Promise<boolean> => {
  return api.post("/auth/login", data);
};
