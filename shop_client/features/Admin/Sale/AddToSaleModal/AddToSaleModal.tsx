"use client";
import { Product } from "@/entities/product";
import styles from "./AddToSaleModal.module.scss";
import { Modal, ModalHeader, ModalContent } from "@/shared/components/Modal";
import { useState } from "react";
import { useAppDispatch } from "@/shared/hooks";
import { add } from "@/store/sale/sale.slice";
import { AddToSaleForm } from "./AddToSaleForm";

import type { SaleItem } from "@/entities/sale";
import { useStore } from "react-redux";
import type { RootState } from "@/store/store";
import { notify } from "@/shared/utils";

interface AddToSaleModalProps {
  product: Product;
  children: React.ReactNode;
}

export const AddToSaleModal = ({ product, children }: AddToSaleModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const store = useStore<RootState>();

  const addToSaleCart = (data: SaleItem) => {
    dispatch(add(data));
    close();
  };

  const close = () => {
    setIsOpen(false);
  };

  const open = () => {
    const currentSaleItems = store.getState().sale;
    const isAvaible =
      currentSaleItems.find((item) => item.product.id === product.id)?.product
        .count !== 0;
    if (!isAvaible) {
      notify.error("Товар закончился");
      return;
    }
    setIsOpen(true);
  };

  return (
    <>
      <Modal isOpen={isOpen} closeAction={close}>
        <ModalHeader>
          <h3>Товар</h3>
        </ModalHeader>
        <ModalContent>
          <AddToSaleForm product={product} handleSubmit={addToSaleCart} />
        </ModalContent>
      </Modal>
      <div className={styles.openElement} onClick={open}>
        {children}
      </div>
    </>
  );
};
