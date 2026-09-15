"use client";
import styles from "./PanelSettingsProducts.module.scss";
import { Product } from "@/entities/product";
import { ProductFormModal } from "@/features/Admin/ProductFormModal";

export const PanelSettingsProducts = ({
  products,
}: {
  products?: Product[];
}) => {
  return (
    <div className={styles.panelSettingsProducts}>
      <div className={styles.list}>
        {products?.map((product) => (
          <div key={product.id} className={styles.productItem}>
            <span>{product.name}</span>
            <span>{product.count}</span>
            <span>{product.cost}</span>
            <ProductFormModal isEdit editData={product}>
              <span>Редактировать</span>
            </ProductFormModal>
          </div>
        ))}
      </div>
    </div>
  );
};
