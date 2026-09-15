import { PanelSidebar } from "@/widgets/Admin/Panel";
import styles from "./PanelLayout.module.scss";
import { Group } from "@/entities/group";
import { SaleCart } from "@/features/Admin/Sale";

interface PanelLayoutProps {
  groups: Group[];
  children: React.ReactNode;
}

export const PanelLayout = ({ groups, children }: PanelLayoutProps) => {
  return (
    <div className={styles.panelLayout}>
      <div className={styles.panelContent}>
        {children} <SaleCart />
      </div>
      <PanelSidebar groups={groups} />
    </div>
  );
};
