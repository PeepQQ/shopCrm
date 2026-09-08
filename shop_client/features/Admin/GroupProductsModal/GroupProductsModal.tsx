"use сlient";
import styles from "./GroupProductsModal.module.scss";
import { Modal, ModalHeader, ModalContent } from "@/shared/components/Modal";
import { useEffect, useState } from "react";
import { Group } from "@/entities/group";
import { useParams } from "next/navigation";
import {
  connectProduct,
  disconnectProduct,
  getPanelProducts,
} from "@/shared/api/client";
import { Product } from "@/entities/product";

interface GroupProductsModalProps {
  children: React.ReactNode;
  group: Group;
}

export const GroupProductsModal = ({
  children,
  group,
}: GroupProductsModalProps) => {
  const { panelId } = useParams<{ panelId: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const [groupProducts, setGroupProducts] = useState<Product[] | []>([]);
  const [otherProducts, setOtherProducts] = useState<Product[] | []>([]);

  useEffect(() => {
    getPanelProducts(panelId).then((res) => {
      setOtherProducts(
        res.data.filter(
          (product) =>
            !group.groupProducts.some(
              (groupProduct) => groupProduct.id === product.id,
            ),
        ),
      );
      setGroupProducts(group.groupProducts);
    });
  }, [panelId]);

  const handleConnectProduct = async (productId: number) => {
    try {
      await connectProduct(group.id, productId);
      const connectedProduct = otherProducts.find(
        (product) => product.id === productId,
      );
      if (!connectedProduct) return;
      setOtherProducts((prev) =>
        prev.filter((product) => product.id !== productId),
      );
      setGroupProducts((prev) => [...prev, connectedProduct]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnectProduct = async (productId: number) => {
    try {
      await disconnectProduct(group.id, productId);
      const disconnectedProduct = groupProducts.find(
        (product) => product.id === productId,
      );
      if (!disconnectedProduct) return;
      setGroupProducts((prev) =>
        prev.filter((product) => product.id !== productId),
      );
      setOtherProducts((prev) => [...prev, disconnectedProduct]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        closeAction={() => setIsOpen(false)}
        classname={styles.modal}
      >
        <ModalHeader>
          <h3>{group.name}</h3>
        </ModalHeader>
        <ModalContent classname={styles.modalContent}>
          <div className={styles.groupProducts}>
            {groupProducts.map((groupProduct) => (
              <div
                key={groupProduct.id}
                className={styles.groupProduct}
                onClick={() => handleDisconnectProduct(groupProduct.id)}
              >
                <span>{groupProduct.name}</span>
                <button>-</button>
              </div>
            ))}
          </div>
          <div className={styles.otherProducts}>
            {otherProducts.map((otherProduct) => (
              <div
                key={otherProduct.id}
                className={styles.otherProduct}
                onClick={() => handleConnectProduct(otherProduct.id)}
              >
                <span>{otherProduct.name}</span>
                <button>+</button>
              </div>
            ))}
          </div>
        </ModalContent>
      </Modal>
      <div onClick={() => setIsOpen(true)}>{children}</div>
    </>
  );
};
