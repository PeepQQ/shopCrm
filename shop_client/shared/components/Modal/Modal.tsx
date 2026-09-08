import clsx from "clsx";
import styles from "./Modal.module.scss";
import { ModalClose } from "./ModalClose";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  closeAction: () => void;
  classname?: string;
}

export const Modal = ({
  children,
  isOpen,
  closeAction,
  classname,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={styles.modalWrapper}
      onClick={(e) => {
        const target = e.target as HTMLDivElement;
        if (target.classList.contains(styles.modalWrapper)) {
          closeAction();
        }
      }}
    >
      <div className={clsx(classname, styles.modal)}>
        <ModalClose action={closeAction} />
        {children}
      </div>
    </div>
  );
};
