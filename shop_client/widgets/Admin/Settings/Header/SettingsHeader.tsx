import styles from "./SettingsHeader.module.scss";
import { links } from "@/shared/config/links";
import { NavLink } from "@/shared/components/NavLink";

export const SettingsHeader = () => {
  return (
    <div className={styles.settingsHeader}>
      <div className={styles.menu}>
        <NavLink
          href={links.admin.settings.inviteUser}
          className={styles.linkItem}
          activeClassName={styles.active}
        >
          +User
        </NavLink>
      </div>
    </div>
  );
};
