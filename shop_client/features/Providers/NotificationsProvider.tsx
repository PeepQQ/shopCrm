"use client";
import { useAppSelector } from "@/shared/hooks";
import { Notifications } from "@/shared/components/Notifications";

export const NotificationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const notifications = useAppSelector((state) => state.notif);

  return (
    <>
      <Notifications notifications={notifications} />
      {children}
    </>
  );
};
