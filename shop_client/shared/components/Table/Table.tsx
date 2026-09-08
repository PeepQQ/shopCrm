import styles from "./Table.module.scss";
import clsx from "clsx";
import type { TableProps } from "./type";

export const Table = ({ children, className, ...rest }: TableProps) => {
  return (
    <table className={clsx(className, styles.table)} {...rest}>
      {children}
    </table>
  );
};
