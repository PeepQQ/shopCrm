import styles from "./Button.module.scss";
import clsx from "clsx";
import type { ButtonProps } from "./types";

export const Button = ({
  children,
  className,
  variant = "primary",
  size = "default",
  fullWidth,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        className,
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
