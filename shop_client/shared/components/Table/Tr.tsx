import { TrProps } from "./type";
import styles from "./Table.module.scss";
import clsx from "clsx";

export const Tr = ({ children, className, ...rest }: TrProps) => {
  return (
    <tr className={clsx(className, styles.tr)} {...rest}>
      {children}
    </tr>
  );
};
