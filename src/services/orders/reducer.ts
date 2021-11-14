import { TOrderInfo, TOrders } from "../../utils/types";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { wsClose, wsError, wsMessage, wsOpen } from "./actions";
import { ThunkAPI } from "../index";
import { baseUrl } from "../../utils/constants";

export const getOrder = createAsyncThunk<Array<TOrderInfo>, string, ThunkAPI>(
  "orders/getOrder",
  async (number, thunkAPI) => {
    const res = await fetch(`${baseUrl}/orders/${number}`);
    const json = await res.json();
    return json.orders as Array<TOrderInfo>;
  }
);

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
    })
    .addCase(getOrder.fulfilled, (state, action) => {
      state.orders = { orders: action.payload, total: 1, totalToday: 1 };
    });
});

export default ordersReducer;
