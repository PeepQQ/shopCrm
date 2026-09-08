import { TbodyProps } from "./type";
import styles from "./Table.module.scss";
import clsx from "clsx";

export const Tbody = ({ children, className, ...rest }: TbodyProps) => {
  return (
    <tbody className={clsx(className, styles.tbody)} {...rest}>
      {children}
    </tbody>
  );
};
