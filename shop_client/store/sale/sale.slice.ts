import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SaleItem } from "@/entities/sale";
import { count } from "console";

type SaleState = SaleItem[] | [];

const initialState = [] as SaleState;

const SaleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    add: (state, { payload: saleItem }: PayloadAction<SaleItem>) => {
      const existingItem = state?.find(
        (item) => item.product.id === saleItem.product.id,
      );

      if (!(existingItem ?? saleItem).product.count) return;

      const actualizedCount =
        (existingItem ?? saleItem).product.count - saleItem.count;

      const updatedState = state?.map((item) =>
        item.product.id === saleItem.product.id
          ? {
              ...item,
              product: {
                ...item.product,
                count: actualizedCount,
              },
            }
          : item,
      );

      return [
        ...(existingItem ? updatedState : state),
        {
          ...saleItem,
          product: {
            ...saleItem.product,
            count: actualizedCount,
          },
        },
      ];
    },
    remove: (state, { payload: saleItem }: PayloadAction<SaleItem>) => {
      const existingItem = state?.find(
        (item) => item.product.id === saleItem.product.id,
      );

      const updatedState = state?.filter((item) => item.id != saleItem.id);

      return updatedState?.map((item) =>
        item.product.id === existingItem?.product.id
          ? {
              ...item,
              product: { ...item.product, count: item.product.count + 1 },
            }
          : item,
      );
    },
  },
});

const { actions, reducer } = SaleSlice;

export const { add, remove } = actions;
export default reducer;
