"use client";
import { useAppSelector, useAppDispatch } from "@/shared/hooks";
import styles from "../styles/OperationPanel.module.scss";
import { Table, Th, Td, Tr, Thead, Tbody } from "@/shared/components/Table";
import { remove } from "@/store/supply/supply.slice";
import { Product } from "@/entities/product";
import { Button } from "@/shared/components/Button";

export const OperationPanelSupply = () => {
  const dispatch = useAppDispatch();
  const supplyItems = useAppSelector((state) => state.supply);

  const deleteSupplyItem = (item: Product) => {
    dispatch(remove(item));
  };

  return (
    <div className={styles.operationPanel}>
      <Table className={styles.operationPanelTable}>
        <Thead>
          <Tr>
            <Th>Название</Th>
            <Th>Кол-во</Th>
            <Th>Действия</Th>
          </Tr>
        </Thead>
        <Tbody>
          {supplyItems?.map((supplyItem, index) => (
            <Tr key={`${supplyItem.id}_${index}`}>
              <Td>{supplyItem.name}</Td>
              <Td>{supplyItem.count}</Td>
              <Td>
                <Button size="sm" onClick={() => deleteSupplyItem(supplyItem)}>
                  Удалить
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <div className={styles.operationPanelActions}></div>
    </div>
  );
};
