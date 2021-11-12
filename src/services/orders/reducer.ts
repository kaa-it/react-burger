import { TOrders } from "../../utils/types";
import { createReducer } from "@reduxjs/toolkit";
import { wsClose, wsError, wsMessage, wsOpen } from "./actions";

export type TOrdersState = {
  orders: TOrders | null;
  connectionError: string;
};

const initialState: TOrdersState = {
  orders: null,
  connectionError: "",
};

const ordersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsOpen, (state) => state)
    .addCase(wsClose, (state) => {
      state.orders = null;
      state.connectionError = "";
    })
    .addCase(wsError, (state, action) => {
      state.connectionError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload;
    });
});

export default ordersReducer;
