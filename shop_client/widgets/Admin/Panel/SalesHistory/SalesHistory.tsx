import { Sale } from "@/entities/sale";
import styles from "./SalesHistory.module.scss";
import { formatDateToLocale } from "@/shared/config";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  TrExpand,
  Th,
  Td,
} from "@/shared/components/Table";
import { DateFilter } from "@/features/Admin/Filters/Date";
import { links } from "@/shared/config/links";
import { DateFilterRange } from "@/features/Admin/Filters/Date/DateFilterRange";
import clsx from "clsx";

interface PanelSalesListProps {
  sales?: Sale[];
  panelId: string;
}

export const SalesHistory = ({ sales, panelId }: PanelSalesListProps) => {
  return (
    <div className={clsx(styles.salesHistory, "tableContent")}>
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
                <Td>{formatDateToLocale(sale.createdAt)}</Td>
              </TrExpand>
            ))}
          </Tbody>
        </Table>
      </div>
      <div className={styles.filters}>
        <div className={styles.filterWrapper}>
          <DateFilter
            redirectBaseUrl={links.admin.panel(panelId).history.sale}
          />
        </div>
        <div className={styles.filterWrapper}>
          <DateFilterRange
            redirectBaseUrl={links.admin.panel(panelId).history.sale}
          />
        </div>
      </div>
    </div>
  );
};
