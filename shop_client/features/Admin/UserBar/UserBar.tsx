"use client";
import styles from "./UserBar.module.scss";
import { useAppSelector } from "@/shared/hooks";
import { SettingsIcon } from "@/assets/icons";
import Link from "next/link";
import { links } from "@/shared/config/links";

export const UserBar = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <div className={styles.userBar}>
      <div className={styles.userBarHead}>
        <p>{user?.name}</p>
        <Link href={links.admin.settings.root}>
          <SettingsIcon width={18} />
        </Link>
      </div>
    </div>
  );
};
