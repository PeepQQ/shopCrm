"use client";
import { useAppSelector } from "@/shared/hooks";
import styles from "./OperationPanelSale.module.scss";
import { Table, Th, Td, Tr, Thead, Tbody } from "@/shared/components/Table";
import { SaleButton } from "./SaleButton";
import { Button } from "@/shared/components/Button";
import { useAppDispatch } from "@/shared/hooks";
import { remove } from "@/store/sale/sale.slice";
import { SaleItem } from "@/entities/sale";

export const OperationPanelSale = () => {
  const dispatch = useAppDispatch();
  const saleItems = useAppSelector((state) => state.sale);

  const handleDelete = (saleItem: SaleItem) => {
    dispatch(remove(saleItem));
  };

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
          {saleItems?.map((saleItem, index) => (
            <Tr key={`${saleItem.product.id}_${index}`}>
              <Td>{saleItem.product.name}</Td>
              <Td>{saleItem.count}</Td>
              <Td>{saleItem.price}</Td>
              <Td>
                <div>
                  <Button size="sm" onClick={() => handleDelete(saleItem)}>
                    Удалить
                  </Button>
                </div>
              </Td>
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
