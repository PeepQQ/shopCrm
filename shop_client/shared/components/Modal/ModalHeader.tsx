import styles from "./Modal.module.scss";

export const ModalHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.modalHeader}>{children}</div>;
};
