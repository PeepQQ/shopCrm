import styles from "./ControlPanelLayout.module.scss";
import { SettingsHeader } from "./Header";

interface ControlPanelLayoutProps {
  children: React.ReactNode;
}

export const ControlPanelLayout = ({ children }: ControlPanelLayoutProps) => {
  return (
    <>
      <SettingsHeader />
      <div className={styles.content}>{children}</div>
    </>
  );
};
