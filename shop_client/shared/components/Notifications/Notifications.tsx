import { Notification } from "@/entities/notification";
import { NotificationItem } from "./NotificationItem";
import styles from "./Notifications.module.scss";

export const Notifications = ({
  notifications,
}: {
  notifications: Notification[];
}) => {
  return (
    <div className={styles.notifications}>
      {notifications
        .filter((item) => !item.shown)
        .map((notification) => (
          <NotificationItem data={notification} key={notification.id} />
        ))}
    </div>
  );
};
