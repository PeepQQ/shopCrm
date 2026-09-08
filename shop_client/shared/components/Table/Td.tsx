import { TdProps } from "./type";
import styles from "./Table.module.scss";
import clsx from "clsx";

export const Td = ({ children, className, ...rest }: TdProps) => {
  return (
    <td className={clsx(className, styles.td)} {...rest}>
      {children}
    </td>
  );
};
