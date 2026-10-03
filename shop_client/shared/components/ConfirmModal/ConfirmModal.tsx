import { useState } from "react";
import { Modal, ModalActions, ModalContent, ModalHeader } from "../Modal";
import styles from "./ConfirmModal.module.scss";
import { Button } from "../Button";

interface ConfirmModalProps {
  onConfirm: () => void;
  onReject?: () => void;
  children: React.ReactNode;
  text?: string;
}

export const ConfirmModal = ({
  onConfirm,
  onReject,
  children,
  text,
}: ConfirmModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    setIsOpen(false);
    onConfirm();
  };

  const handleReject = () => {
    setIsOpen(false);
    onReject?.();
  };

  return (
    <>
      <Modal isOpen={isOpen} closeAction={() => setIsOpen(false)}>
        <ModalHeader>
          <h3>Вы уверены?</h3>
        </ModalHeader>
        <ModalContent>
          <p>{text}</p>
        </ModalContent>
        <ModalActions>
          <div className={styles.actions}>
            <Button onClick={handleConfirm}>Да</Button>
            <Button onClick={handleReject}>Нет</Button>
          </div>
        </ModalActions>
      </Modal>
      <div className={styles.triggerWrapper} onClick={() => setIsOpen(true)}>{children}</div>
    </>
  );
};
