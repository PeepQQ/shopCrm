import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user.slice";
import panelReducer from "./panel/panel.slice";
import saleReducer from "./sale/sale.slice";
import groupReducer from "./group/group.slice";
import supplyReducer from "./supply/supply.slice";
import notificationReducer from "./notification/notification.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    panel: panelReducer,
    sale: saleReducer,
    group: groupReducer,
    supply: supplyReducer,
    notif: notificationReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
