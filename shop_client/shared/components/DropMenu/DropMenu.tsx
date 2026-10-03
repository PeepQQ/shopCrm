import { DotsMenuIcon } from "@/assets/icons";
import styles from "./DropMenu.module.scss";

interface DropMenuProps {
  children: React.ReactNode;
}

export const DropMenu = ({ children }: DropMenuProps) => {
  return (
    <div className={styles.dropMenu}>
      <button className={styles.dropMenuTrigger}>
        <DotsMenuIcon />
      </button>
      <div className={styles.dropMenuContent}>{children}</div>
    </div>
  );
};
