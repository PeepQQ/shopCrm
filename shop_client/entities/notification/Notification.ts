export interface Notification {
  id: number | string;
  type: "success" | "error" | "apiError" | "info";
  message: string;
  shown?: boolean;
}
