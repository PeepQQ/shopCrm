"use сlient";
import { Button } from "@/shared/components/Button";
import styles from "./CreatePanel.module.scss";
import { Input } from "@/shared/components/Input";
import {
  Modal,
  ModalClose,
  ModalActions,
  ModalHeader,
  ModalContent,
} from "@/shared/components/Modal";
import { useState } from "react";
import { createPanel } from "@/shared/api/client/Panel.api";
import { useRouter } from "next/navigation";

export const CreatePanel = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [panelName, setPanelName] = useState("");

  const close = () => {
    setIsOpen(false);
  };

  const handleCreate = async () => {
    try {
      const res = await createPanel({ name: panelName });
      router.refresh();
      setIsOpen(false);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} closeAction={() => setIsOpen(false)}>
        <ModalHeader>
          <h3>Новая панель</h3>
        </ModalHeader>
        <ModalContent>
          <Input
            required
            onChange={(e) => setPanelName(e.currentTarget.value)}
          />
        </ModalContent>
        <ModalActions>
          <Button onClick={handleCreate} fullWidth>
            Подтвердить
          </Button>
        </ModalActions>
      </Modal>
      <div className={styles.openElement} onClick={() => setIsOpen(true)}>
        {children}
      </div>
    </>
  );
};
