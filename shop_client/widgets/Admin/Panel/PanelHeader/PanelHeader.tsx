"use client";
import Link from "next/link";
import styles from "./PanelHeader.module.scss";
import { ProductFormModal } from "@/features/Admin/ProductFormModal";
import { links } from "@/shared/config/links";
import { useParams } from "next/navigation";
import { panelHeaderLinks } from "./config";

export const PanelHeader = () => {
  const { panelId } = useParams<{ panelId: string }>();
  return (
    <div className={styles.panelHeader}>
      <div className={styles.menu}>
        {panelHeaderLinks.map((link) => (
          <Link
            key={link.text}
            href={link.href(panelId)}
            className={styles.menuItem}
          >
            {link.text}
          </Link>
        ))}
        <ProductFormModal>
          <span className={styles.menuItem}>Создать товар</span>
        </ProductFormModal>
      </div>
    </div>
  );
};
