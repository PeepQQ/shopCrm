import { Sale } from "@/entities/sale";
import styles from "./PanelSalesList.module.scss";
import { formatDate } from "@/shared/config";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  TrExpand,
  Th,
  Td,
} from "@/shared/components/Table";

interface PanelSalesListProps {
  sales?: Sale[];
}

export const PanelSalesList = ({ sales }: PanelSalesListProps) => {
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
            {sales?.map((sale) => (
              <TrExpand
                key={sale.id}
                extendContent={
                  <Td className={styles.saleItems} colSpan={10}>
                    <Table>
                      <Thead>
                        <Tr>
                          <Th>Товар</Th>
                          <Th>Сумма</Th>
                          <Th>Скидка %</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {sale.saleItems.map((saleItem) => (
                          <Tr key={saleItem.id} className={styles.saleItem}>
                            <Td>{saleItem.product.name}</Td>
                            <Td>{saleItem.price}</Td>
                            <Td>{saleItem.discountPercent}%</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Td>
                }
              >
                <Td>{sale.id}</Td>
                <Td>{sale.total}</Td>
                <Td>{formatDate(sale.createdAt)}</Td>
              </TrExpand>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
};
