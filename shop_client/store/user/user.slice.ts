import { UserData } from "@/entities/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = UserData | null;

const initialState = null as UserState;

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      return action.payload;
    },
  },
});

const { actions, reducer } = UserSlice;

export const { setUser } = actions;
export default reducer;
