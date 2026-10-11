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

export const formatDateToLocale = (date: string) =>
  new Date(date).toLocaleString("ru-RU");

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

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
