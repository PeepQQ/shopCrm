import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SaleItem } from "@/entities/sale";

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
    remove: (state, { payload: sale }: PayloadAction<SaleItem>) => {
      return state?.filter((i) => i.product.id != sale.product.id);
    },
  },
});

const { actions, reducer } = SaleSlice;

export const { add, remove } = actions;
export default reducer;
