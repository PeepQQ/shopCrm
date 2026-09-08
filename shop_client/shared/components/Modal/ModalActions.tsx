import styles from "./Modal.module.scss";

export const ModalActions = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.modalActions}>{children}</div>;
};
