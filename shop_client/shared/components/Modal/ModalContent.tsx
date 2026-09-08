import clsx from "clsx";
import styles from "./Modal.module.scss";

export const ModalContent = ({
  children,
  classname,
}: {
  children: React.ReactNode;
  classname?: string;
}) => {
  return <div className={clsx(classname, styles.modalContent)}>{children}</div>;
};
