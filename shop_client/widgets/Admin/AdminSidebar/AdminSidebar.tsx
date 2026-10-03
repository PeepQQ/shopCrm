"use client";
import { Panel } from "@/entities/panel";
import styles from "./AdminSidebar.module.scss";
import { PanelsList } from "@/features/Admin/PanelsList";

interface AdminSidebarProps {
  panels: Panel[];
}

export const AdminSidebar = ({ panels }: AdminSidebarProps) => {
  return (
    <div className={styles.adminSidebarWrapper}>
      <PanelsList panels={panels} />
    </div>
  );
};
