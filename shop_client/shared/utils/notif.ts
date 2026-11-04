import store from "@/store/store";
import { push } from "@/store/notification/notification.slice";
import { getApiError } from "./api";
import { nanoid } from "@reduxjs/toolkit";

export const notify = {
  success: (message: string) =>
    store.dispatch(push({ id: nanoid(10), type: "success", message })),
  error: (message: string) =>
    store.dispatch(push({ id: nanoid(10), type: "error", message })),
  apiError: (message: unknown) =>
    store.dispatch(
      push({
        id: nanoid(10),
        type: "apiError",
        message: getApiError(message).message,
      }),
    ),
  info: (message: string) =>
    store.dispatch(push({ id: nanoid(10), type: "info", message })),
};
