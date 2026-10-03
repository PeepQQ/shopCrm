import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user.slice";
import panelReducer from "./panel/panel.slice";
import saleReducer from "./sale/sale.slice";
import groupReducer from "./group/group.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    panel: panelReducer,
    sale: saleReducer,
    group: groupReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
