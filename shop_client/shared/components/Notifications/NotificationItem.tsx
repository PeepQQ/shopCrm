"use client";
import { useAppDispatch } from "@/shared/hooks";
import { markAsShown } from "@/store/notification/notification.slice";
import { Notification } from "@/entities/notification";
import { useEffect } from "react";
import styles from "./Notifications.module.scss";

export const NotificationItem = ({ data }: { data: Notification }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(markAsShown(data));
    }, 5000);
  }, [data.id]);

  return (
    <div
      className={styles.notificationItem}
      onClick={() => dispatch(markAsShown(data))}
    >
      <p>{data.message}</p>
    </div>
  );
};
