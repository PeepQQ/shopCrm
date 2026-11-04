import { Sale } from "@/entities/sale";
import styles from "./SalesHistory.module.scss";
import { formatDateToLocale } from "@/shared/utils";

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
                  <Td className={styles.saleItemsWrapper} colSpan={3}>
                    <div className={styles.saleItems}>
                      <div className={styles.saleItemsList}>
                        {sale.saleItems.map((saleItem) => (
                          <div key={saleItem.id} className={styles.saleItem}>
                            <span>{saleItem.product.name}</span>
                            <span>
                              {saleItem.price}
                              {` [${saleItem.discountPercent}%]`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
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
