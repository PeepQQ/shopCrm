import axios from "axios";

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}

export function getApiError(error: unknown): ApiError {
  if (!axios.isAxiosError<ApiError>(error)) {
    return {
      statusCode: 404,
      message: "Произошла неизвестная ошибка",
      error: "Произошла неизвестная ошибка",
    };
  }

  return (
    error.response?.data ?? {
      statusCode: 404,
      message: "Произошла неизвестная ошибка",
      error: "Произошла неизвестная ошибка",
    }
  );
}
