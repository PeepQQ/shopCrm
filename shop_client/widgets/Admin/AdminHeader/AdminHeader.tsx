import Link from "next/link";
import styles from "./AdminHeader.module.scss";
import { links } from "@/shared/config/links";

interface AdminHeaderProps {
  panelId?: string;
}

export const AdminHeader = ({ panelId }: AdminHeaderProps) => {
  return (
    <div className={styles.adminHeader}>
      {panelId && (
        <Link href={links.admin.panel(panelId).settings.products}>
          Настройки
        </Link>
      )}
    </div>
  );
};
