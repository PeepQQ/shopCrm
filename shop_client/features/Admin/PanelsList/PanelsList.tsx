"use client";
import { useState } from "react";
import { Panel } from "@/entities/panel";
import styles from "./PanelsList.module.scss";
import Link from "next/link";
import { links } from "@/shared/config/links";
import { CreatePanel } from "../CreatePanel";
import { Button } from "@/shared/components/Button";
import { WindowIcon } from "@/assets/icons";
import clsx from "clsx";

interface PanelsListProps {
  panels: Panel[];
}

export const PanelsList = ({ panels }: PanelsListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={clsx(styles.panelsListMenuWrapper, isOpen ? styles.open : "")}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.panelsListTrigger}
      >
        <WindowIcon width={24} height={24} />
      </button>
      <div className={styles.panelsListMenu}>
        {panels?.length > 0 && (
          <div className={styles.panelsList}>
            {panels.map((panel) => (
              <Link
                key={panel.id}
                className={styles.panelListItem}
                href={links.admin.panel(panel.id).table.root}
              >
                {panel.name}
              </Link>
            ))}
          </div>
        )}
        <CreatePanel>
          <Button fullWidth className={styles.createPanelAction} size="sm">
            Создать панель
          </Button>
        </CreatePanel>
      </div>
    </div>
  );
};
