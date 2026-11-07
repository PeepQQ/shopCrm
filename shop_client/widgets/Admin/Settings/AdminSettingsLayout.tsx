import styles from "./AdminSettingsLayout.module.scss";
import { SettingsHeader } from "./Header";

interface AdminSettingsLayoutProps {
  children: React.ReactNode;
}

export const AdminSettingsLayout = ({ children }: AdminSettingsLayoutProps) => {
  return (
    <>
      <SettingsHeader />
      <div className={styles.content}>{children}</div>
    </>
  );
};
