import { ThProps } from "./type";
import styles from "./Table.module.scss";
import clsx from "clsx";

export const Th = ({ children, className, ...rest }: ThProps) => {
  return (
    <th className={clsx(className, styles.th)} {...rest}>
      {children}
    </th>
  );
};
