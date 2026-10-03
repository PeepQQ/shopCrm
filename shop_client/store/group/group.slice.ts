import type { Group } from "@/entities/group";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GroupState = Group[] | [];

const initialState = [] as GroupState;

const GroupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Group[]>) => {
      return action.payload;
    },
  },
});

const { actions, reducer } = GroupSlice;

export const { update } = actions;
export default reducer;
