import { TheadProps } from "./type";
import styles from "./Table.module.scss";
import clsx from "clsx";

export const Thead = ({ children, className, ...rest }: TheadProps) => {
  return (
    <thead className={clsx(className, styles.thead)} {...rest}>
      {children}
    </thead>
  );
};
