"use client";
import { CartIcon } from "@/assets/icons";
import styles from "./OperationPanelSale.module.scss";
import { createSale } from "@/shared/api/client";
import { useAppSelector } from "@/shared/hooks";

import { useParams } from "next/navigation";
import { notify } from "@/shared/utils/notif";

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
      await createSale({
        panelId: Number(panelId),
        saleItems: formattedSaleItems,
      });
    } catch (err) {
      notify.apiError(err);
    }
  };

  return (
    <button className={styles.operationPanelAction} onClick={handleSale}>
      <CartIcon className={styles.saleButtonIcon} />
    </button>
  );
};
