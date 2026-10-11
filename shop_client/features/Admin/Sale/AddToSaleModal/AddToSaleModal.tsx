"use client";
import { Product } from "@/entities/product";
import styles from "./AddToSaleModal.module.scss";
import { Modal, ModalHeader, ModalContent } from "@/shared/components/Modal";
import { useState } from "react";
import { useAppDispatch } from "@/shared/hooks";
import { add } from "@/store/sale/sale.slice";
import { AddToSaleForm } from "./AddToSaleForm";

import type { SaleItem } from "@/entities/sale";

interface AddToSaleModalProps {
  product: Product;
  children: React.ReactNode;
}

export const AddToSaleModal = ({ product, children }: AddToSaleModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const addToSaleCart = (data: SaleItem) => {
    dispatch(add(data));
    close();
  };

  const close = () => {
    setIsOpen(false);
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
      <div className={styles.openElement} onClick={() => setIsOpen(true)}>
        {children}
      </div>
    </>
  );
};
