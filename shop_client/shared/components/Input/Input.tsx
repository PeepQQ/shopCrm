import { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";
import clsx from "clsx";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "name">;

export const Input = ({ className, ...rest }: InputProps) => {
  return <input className={clsx(className, styles.input)} {...rest} />;
};
