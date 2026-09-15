import { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";
import clsx from "clsx";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "name"> & {
  labelClassName?: string;
  label?: string;
};

export const Input = ({
  className,
  label,
  labelClassName,
  ...rest
}: InputProps) => {
  return (
    <label className={clsx(labelClassName, styles.label)} htmlFor={rest.id}>
      {label}
      <input className={clsx(className, styles.input)} {...rest} />
    </label>
  );
};
