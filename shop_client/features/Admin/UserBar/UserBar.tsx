"use client";
import styles from "./UserBar.module.scss";
import { useAppSelector } from "@/shared/hooks";
import { links } from "@/shared/config/links";
import { LinkButton } from "@/shared/components/LinkButton";

export const UserBar = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <div className={styles.userBar}>
      <div className={styles.userBarHead}>
        <p>{user?.name}</p>
        <LinkButton href={links.admin.control.root} size="sm">
          Панель управления
        </LinkButton>
      </div>
    </div>
  );
};
