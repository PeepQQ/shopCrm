import { Sale } from "@/entities/sale";
import styles from "./PanelSalesList.module.scss";
import { formatDate } from "@/shared/config";

import { Table, Thead, Tbody, Tr, Th, Td } from "@/shared/components/Table";

interface PanelSalesListProps {
  sales: Sale[];
}

export const PanelSalesList = ({ sales }: PanelSalesListProps) => {
  console.log(sales[11]);
  return (
    <div className={styles.panelSalesList}>
      <div className={styles.salesTableWrapper}>
        <Table className={styles.salesListTable}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Сумма</Th>
              <Th>Дата</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sales.map((sale) => (
              <Tr
                key={sale.id}
                extendContent={
                  <td className={styles.saleItems} colSpan={5}>
                    {sale.saleItems.map((saleItem) => (
                      <div key={saleItem.id} className={styles.saleItem}>
                        <span>{saleItem.product.name}</span>
                      </div>
                    ))}
                  </td>
                }
              >
                <Td>{sale.id}</Td>
                <Td>{sale.total}</Td>
                <Td>{formatDate(sale.createdAt)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
};
