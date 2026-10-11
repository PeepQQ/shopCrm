import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/entities/product";

type SupplyState = Product[] | [];

const initialState = [] as SupplyState;

const SupplySlice = createSlice({
  name: "supply",
  initialState,
  reducers: {
    add: (state, { payload: supplyItem }: PayloadAction<Product>) => {
      return [...state, supplyItem];
    },
    remove: (state, { payload: supplyItem }: PayloadAction<Product>) => {
      return state?.filter((i) => i.id != supplyItem.id);
    },
  },
});

const { actions, reducer } = SupplySlice;

export const { add, remove } = actions;
export default reducer;
