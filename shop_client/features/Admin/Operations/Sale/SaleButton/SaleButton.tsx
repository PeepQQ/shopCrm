"use client";
import { CartIcon } from "@/assets/icons";
import styles from "./SaleButton.module.scss";
import { createSale } from "@/shared/api/client";
import { useAppSelector } from "@/shared/hooks";

import { useParams } from "next/navigation";

export const SaleButton = () => {
  const { panelId } = useParams<{ panelId: string }>();
  const saleItems = useAppSelector((state) => state.sale);

  const handleSale = async () => {
    if (!saleItems?.length) return null;
    const formattedSaleItems = saleItems?.map((item) => {
      const { product, ...saleItemData } = item;
      const saleItem = {
        ...saleItemData,
        productId: product.id,
      };

      return saleItem;
    });

    try {
      const res = await createSale({
        panelId: Number(panelId),
        saleItems: formattedSaleItems,
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <button className={styles.saleButton} onClick={handleSale}>
      <CartIcon className={styles.saleButtonIcon} />
    </button>
  );
};
