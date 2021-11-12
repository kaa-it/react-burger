import { createAction } from "@reduxjs/toolkit";
import { TOrders } from "../../utils/types";

export const connect = createAction<string, "ORDERS_CONNECT">("ORDERS_CONNECT");
export const disconnect = createAction("ORDERS_DISCONNECT");
export const wsOpen = createAction("ORDERS_WS_OPEN");
export const wsClose = createAction("ORDERS_WS_CLOSE");
export const wsMessage = createAction<TOrders, "ORDERS_WS_MESSAGE">(
  "ORDERS_WS_MESSAGE"
);
export const wsError = createAction<string, "ORDERS_WS_ERROR">(
  "ORDERS_WS_ERROR"
);
