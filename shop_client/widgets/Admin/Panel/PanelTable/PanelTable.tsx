import { Product } from "@/entities/product";
import styles from "./PanelTable.module.scss";
import { AddToSaleCartModal } from "@/features/Admin/Sale";

interface PanelTableProps {
  products: Product[];
}

export const PanelTable = ({ products }: PanelTableProps) => {
  return (
    <div className={styles.panelTable}>
      <table className={styles.tableProducts}>
        <thead>
          <tr>
            <th>Название</th>
            <th>Кол-во</th>
            <th>Цена</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.count}</td>
              <td>{product.cost}</td>
              <td>
                <AddToSaleCartModal product={product}>
                  <span>Добавить</span>
                </AddToSaleCartModal>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
