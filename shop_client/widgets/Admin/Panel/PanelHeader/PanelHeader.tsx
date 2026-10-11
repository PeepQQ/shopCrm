"use client";
import Link from "next/link";
import styles from "./PanelHeader.module.scss";
import { ProductFormModal } from "@/features/Admin/ProductFormModal";
import { links } from "@/shared/config/links";
import { useParams } from "next/navigation";

export const PanelHeader = () => {
  const { panelId } = useParams<{ panelId: string }>();
  return (
    <div className={styles.panelHeader}>
      <div className={styles.menu}>
        <Link
          href={links.admin.panel(panelId).settings.products}
          className={styles.menuItem}
        >
          Настройки
        </Link>
        <ProductFormModal>
          <span className={styles.menuItem}>Создать товар</span>
        </ProductFormModal>
        <Link
          href={links.admin.panel(panelId).groups.root}
          className={styles.menuItem}
        >
          Таблица
        </Link>
        <Link
          href={links.admin.panel(panelId).history.sale}
          className={styles.menuItem}
        >
          История
        </Link>
      </div>
    </div>
  );
};
