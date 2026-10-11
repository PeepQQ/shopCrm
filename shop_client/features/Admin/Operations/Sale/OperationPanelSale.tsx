"use client";
import { useAppSelector } from "@/shared/hooks";
import styles from "../styles/OperationPanel.module.scss";
import { Table, Th, Td, Tr, Thead, Tbody } from "@/shared/components/Table";
import { SaleButton } from "./SaleButton/SaleButton";

export const OperationPanelSale = () => {
  const sales = useAppSelector((state) => state.sale);

  return (
    <div className={styles.operationPanel}>
      <Table className={styles.operationPanelTable}>
        <Thead>
          <Tr>
            <Th>Название</Th>
            <Th>Кол-во</Th>
            <Th>Цена</Th>
            <Th>Действия</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sales?.map((sale, index) => (
            <Tr key={`${sale.product.id}_${index}`}>
              <Td>{sale.product.name}</Td>
              <Td>{sale.count}</Td>
              <Td>{sale.price}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <div className={styles.operationPanelActions}>
        <SaleButton />
      </div>
    </div>
  );
};
