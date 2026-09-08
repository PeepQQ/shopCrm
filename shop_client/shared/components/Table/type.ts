import { HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from "react";

export type TableProps = HTMLAttributes<HTMLTableElement>;
export type TheadProps = HTMLAttributes<HTMLTableSectionElement>;
export type TbodyProps = HTMLAttributes<HTMLTableSectionElement>;
export type TfootProps = HTMLAttributes<HTMLTableSectionElement>;

export type TrProps = HTMLAttributes<HTMLTableRowElement> & {
  extendContent?: React.ReactNode;
};

export type ThProps = ThHTMLAttributes<HTMLTableCellElement>;
export type TdProps = TdHTMLAttributes<HTMLTableCellElement>;

export type CaptionProps = HTMLAttributes<HTMLTableCaptionElement>;
