"use client";
import { Panel } from "@/entities/panel";
import styles from "./AdminSidebar.module.scss";
import { CreatePanel } from "@/features/Admin/CreatePanel";
import Link from "next/link";
import { links } from "@/shared/config/links";
import { Button } from "@/shared/components/Button";

interface AdminSidebarProps {
  panels: Panel[];
}

export const AdminSidebar = ({ panels }: AdminSidebarProps) => {
  return (
    <div className={styles.adminSidebarWrapper}>
      <div className={styles.adminSidebar}>
        {panels?.length > 0 && (
          <div className={styles.panelsList}>
            {panels.map((panel) => (
              <Link
                key={panel.id}
                className={styles.panelListItem}
                href={links.admin.panel(panel.id).table.root}
              >
                <h4>{panel.name}</h4>
              </Link>
            ))}
          </div>
        )}
        <CreatePanel>
          <Button fullWidth className={styles.createPanelAction}>
            Создать панель
          </Button>
        </CreatePanel>
      </div>
    </div>
  );
};
