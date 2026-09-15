"use client";
import { useState } from "react";
import { TrProps } from "./type";
import styles from "./Table.module.scss";
import clsx from "clsx";

export const TrExpand = ({
  children,
  className,
  extendContent,
  ...rest
}: TrProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr
        className={clsx(className, styles.tr, styles.expandOpen)}
        {...rest}
        onClick={() => {
          if (extendContent) setIsOpen((prev) => !prev);
        }}
      >
        {children}
      </tr>
      {extendContent && (
        <tr className={clsx(styles.extendContent, isOpen ? styles.open : "")}>
          {extendContent}
        </tr>
      )}
    </>
  );
};
