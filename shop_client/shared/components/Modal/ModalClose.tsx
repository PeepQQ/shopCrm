import styles from "./Modal.module.scss";

interface ModalCloseProps {
  action: () => void;
}

export const ModalClose = ({ action }: ModalCloseProps) => {
  return (
    <button className={styles.modalClose} onClick={action}>
      x
    </button>
  );
};
