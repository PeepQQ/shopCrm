import { links } from "@/shared/config/links";
import styles from "./PanelSettings.module.scss";
import { NavLink } from "@/shared/components/NavLink";

interface PanelSettingsProps {
  panelId: string;
  children: React.ReactNode;
}

export const PanelSettings = ({ panelId, children }: PanelSettingsProps) => {
  return (
    <div className={styles.panelSettings}>
      <div className={styles.menu}>
        <NavLink
          href={links.admin.panel(panelId).settings.products}
          activeClassName={styles.menuLinkActive}
          className={styles.menuLink}
        >
          Товары
        </NavLink>
        <NavLink
          href={links.admin.panel(panelId).settings.groups}
          activeClassName={styles.menuLinkActive}
          className={styles.menuLink}
        >
          Группы
        </NavLink>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
