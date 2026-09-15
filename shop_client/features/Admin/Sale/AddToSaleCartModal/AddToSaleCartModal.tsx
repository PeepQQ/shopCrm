"use client";
import { Product } from "@/entities/product";
import styles from "./AddToSaleCartModal.module.scss";
import {
  Modal,
  ModalActions,
  ModalHeader,
  ModalContent,
} from "@/shared/components/Modal";
import { useState } from "react";
import { useAppDispatch } from "@/shared/hooks";
import { add } from "@/store/sale/sale.slice";
import { Button } from "@/shared/components/Button";
import { AddToSaleCartForm } from "./AddToSaleCartForm";

import type { SaleItem } from "@/entities/sale";

interface AddToSaleCartModalProps {
  product: Product;
  children: React.ReactNode;
}

export const AddToSaleCartModal = ({
  product,
  children,
}: AddToSaleCartModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const addToSaleCart = (data: SaleItem) => {
    dispatch(add(data));
  };

  return (
    <>
      <Modal isOpen={isOpen} closeAction={() => setIsOpen(false)}>
        <ModalHeader>
          <h3>Товар</h3>
        </ModalHeader>
        <ModalContent>
          <AddToSaleCartForm product={product} handleSubmit={addToSaleCart} />
        </ModalContent>
      </Modal>
      <div className={styles.openElement} onClick={() => setIsOpen(true)}>
        {children}
      </div>
    </>
  );
};
