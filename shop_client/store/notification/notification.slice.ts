import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "@/entities/notification";

type NotificationState = Notification[] | [];

const initialState = [] as NotificationState;

const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    push: (state, action: PayloadAction<Notification>) => {
      return [...state, action.payload];
    },
    markAsShown: (state, action: PayloadAction<Notification>) => {
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, shown: true } : item,
      );
    },
  },
});

const { actions, reducer } = NotificationSlice;

export const { push, markAsShown } = actions;
export default reducer;
