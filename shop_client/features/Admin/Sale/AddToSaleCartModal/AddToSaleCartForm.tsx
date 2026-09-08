import { Product } from "@/entities/product";
import styles from "./AddToSaleCartModal.module.scss";
import { Input } from "@/shared/components/Input";
import { useState } from "react";

import {
  subtractPercent,
  getDecreasePercent,
  toFixedLength,
} from "@/shared/config";
import { SaleItem } from "@/entities/sale";
import { Button } from "@/shared/components/Button";
import { useAppSelector } from "@/shared/hooks";

interface AddToSaleCartFormProps {
  product: Product;
  handleSubmit: (data: SaleItem) => void;
}

export const AddToSaleCartForm = ({
  product,
  handleSubmit,
}: AddToSaleCartFormProps) => {
  const saleItem = useAppSelector((state) =>
    state.sale?.find((saleItem) => saleItem.product.id === product.id),
  ) as SaleItem | undefined;
  const [count, setCount] = useState<number>(1);
  const [percent, setPercent] = useState<number>(0);
  const [_, setProductPrice] = useState<number>(product.cost);
  const [totalPrice, setTotalPrice] = useState<number>(product.cost);

  const handlePercent = (value: string) => {
    const percentValue = toFixedLength(value, 2);
    setPercent(percentValue);
    updateProductPrice(percentValue);
  };

  const handleTotalPrice = (value: string) => {
    const priceValue = toFixedLength(value, 2);
    setTotalPrice(priceValue);
    updatePercent(priceValue);
  };

  const handleCount = (value: string) => {
    const maxAvaibleCount = saleItem?.product.count ?? product.count;
    const countValue =
      Number(value) > maxAvaibleCount ? maxAvaibleCount || 0 : Number(value);

    setCount(countValue);
    updateTotalPrice(countValue);
  };

  const updateProductPrice = (currentPercent: number) => {
    const productPriceValue = toFixedLength(
      subtractPercent(product.cost, currentPercent),
      2,
    );
    setProductPrice(productPriceValue);
    updateTotalPrice(count, productPriceValue);
  };

  const updateTotalPrice = (
    currentCount: number,
    currentProductPrice?: number,
  ) => {
    const productPrice =
      currentProductPrice ||
      toFixedLength(subtractPercent(product.cost, percent), 2);
    setTotalPrice(productPrice * currentCount);
  };

  const updatePercent = (currentPrice: number) => {
    const cleanTotalPrice = product.cost * count;
    const percentValue = toFixedLength(
      getDecreasePercent(cleanTotalPrice, currentPrice),
      2,
    );
    setPercent(percentValue);
  };

  const handleSubmitData = () => {
    handleSubmit({
      count: count,
      price: totalPrice,
      discountPercent: percent,

      product: product,
    });
  };

  return (
    <div className={styles.addToSaleCartForm}>
      <div className={styles.fields}>
        <div className={styles.fieldItem}>
          <Input
            type="number"
            placeholder="Количество"
            step={1}
            value={count}
            onChange={({ target }) => {
              handleCount(target.value);
            }}
          />
        </div>
        <div className={styles.fieldItem}>
          <Input
            type="number"
            placeholder={`Скидка, %`}
            value={percent}
            step={1}
            onChange={({ target }) => {
              handlePercent(target.value);
            }}
          />
        </div>
        <div className={styles.fieldItem}>
          <Input
            type="number"
            placeholder={"Цена"}
            value={totalPrice}
            step={0.1}
            onChange={({ target }) => {
              handleTotalPrice(target.value);
            }}
          />
        </div>
      </div>
      <Button fullWidth onClick={handleSubmitData}>
        Подтвердить
      </Button>
    </div>
  );
};
