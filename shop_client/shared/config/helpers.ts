import axios from "axios";

export const subtractPercent = (value: number, percent: number) => {
  return value * (1 - percent / 100);
};

export const getDecreasePercent = (oldValue: number, newValue: number) => {
  return ((oldValue - newValue) / oldValue) * 100;
};

export const toFixedLength = (
  value: string | number,
  length: number,
): number => {
  return Number(Number(value).toFixed(length));
};

export const formatDate = (date: string) =>
  new Date(date).toLocaleString("ru-RU");

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
}
export function getApiError(error: unknown): ApiError | null {
  if (!axios.isAxiosError<ApiError>(error)) {
    return null;
  }

  return error.response?.data ?? null;
}
