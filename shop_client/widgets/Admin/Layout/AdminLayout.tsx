import { AdminSidebar } from "@/widgets/Admin";
import styles from "./AdminLayout.module.scss";
import { Panel } from "@/entities/panel";

interface AdminLayoutProps {
  children: React.ReactNode;
  panels: Panel[];
}

export const AdminLayout = ({ children, panels }: AdminLayoutProps) => {
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <AdminSidebar panels={panels} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
