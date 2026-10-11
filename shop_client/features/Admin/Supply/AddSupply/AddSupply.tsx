"use client";
import { Button } from "@/shared/components/Button";
import { useState } from "react";
import styles from "./AddSupply.module.scss";
import { Product } from "@/entities/product";
import { add } from "@/store/supply/supply.slice";
import { useAppDispatch } from "@/shared/hooks";

interface AddSupplyProps {
  product: Product;
}

export const AddSupply = ({ product }: AddSupplyProps) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(0);

  const handleAdd = () => {
    dispatch(add({ ...product, count: value }));
  };

  return (
    <div className={styles.addSupply}>
      {isEdit ? (
        <>
          <input
            type="number"
            min={0}
            value={value}
            className={styles.countField}
            onChange={(e) => setValue(Number(e.target.value))}
          />
          <Button
            size="sm"
            onClick={() => {
              handleAdd();
              setValue(0);
              setIsEdit(false);
            }}
          >
            Принять
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setIsEdit(false);
              setValue(0);
            }}
          >
            Отмена
          </Button>
        </>
      ) : (
        <Button size="sm" onClick={() => setIsEdit(true)}>
          +
        </Button>
      )}
    </div>
  );
};
