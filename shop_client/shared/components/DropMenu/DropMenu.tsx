import { DotsMenuIcon } from "@/assets/icons";
import styles from "./DropMenu.module.scss";
import { useState } from "react";
import clsx from "clsx";

interface DropMenuProps {
  children: React.ReactNode;
}

export const DropMenu = ({ children }: DropMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={clsx(styles.dropMenu, isOpen ? styles.open : "")}>
      <button
        className={styles.dropMenuTrigger}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <DotsMenuIcon />
      </button>
      <div className={styles.dropMenuContent}>{children}</div>
    </div>
  );
};
