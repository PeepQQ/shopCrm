"use client";
import { useAppSelector, useAppDispatch } from "@/shared/hooks";
import styles from "./OperationPanelSupply.module.scss";
import { Table, Th, Td, Tr, Thead, Tbody } from "@/shared/components/Table";
import { remove, reset } from "@/store/supply/supply.slice";
import { Product } from "@/entities/product";
import { Button } from "@/shared/components/Button";
import { PlaneIcon } from "@/assets/icons";
import { createPanelSupply } from "@/shared/api/client";
import { useParams } from "next/navigation";

import { notify } from "@/shared/utils/notif";

export const OperationPanelSupply = () => {
  const { panelId } = useParams<{ panelId: string }>();
  const dispatch = useAppDispatch();
  const supplyItems = useAppSelector((state) => state.supply);

  const deleteSupplyItem = (item: Product) => {
    dispatch(remove(item));
  };

  const handleSupply = async () => {
    try {
      await createPanelSupply({
        panelId,
        items: supplyItems.map((supplyItem) => ({
          productId: supplyItem.id,
          count: supplyItem.count,
        })),
      });
      dispatch(reset());
    } catch (err) {
      notify.apiError(err);
    }
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
      <div className={styles.operationPanelActions}>
        <button className={styles.operationPanelAction} onClick={handleSupply}>
          <PlaneIcon width={28} height={28} />
        </button>
      </div>
    </div>
  );
};
