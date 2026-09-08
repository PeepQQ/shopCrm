import type { Panel } from "@/entities/panel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PanelState = Panel[] | null;

const initialState = null as PanelState;

const PanelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<Panel[]>) => {
      return action.payload;
    },
  },
});

const { actions, reducer } = PanelSlice;

export const { setList } = actions;
export default reducer;
