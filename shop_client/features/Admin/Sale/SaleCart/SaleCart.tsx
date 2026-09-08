"use client";
import { useAppSelector } from "@/shared/hooks";
import styles from "./SaleCart.module.scss";
import { SaleButton } from "../SaleButton";

export const SaleCart = () => {
  const sales = useAppSelector((state) => state.sale);

  return (
    <div className={styles.saleCart}>
      <table className={styles.saleCartTable}>
        <thead>
          <tr>
            <th>Название</th>
            <th>Кол-во</th>
            <th>Цена</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {sales?.map((sale, index) => (
            <tr key={`${sale.product.id}_${index}`}>
              <td>{sale.product.name}</td>
              <td>{sale.count}</td>
              <td>{sale.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.saleActions}>
        <SaleButton />
      </div>
    </div>
  );
};
