import ingredientsReducer from "./ingredientsSlice";
import constructorReducer from "./constructorSlice";
import orderSliceReducer from "./orderSlice";
import authSliceReducer from "./authSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ordersReducer from "./orders/reducer";
import {
  connect as OrdersWsConnect,
  disconnect as OrdersWsDisconnect,
  wsOpen as OrdersWsOpen,
  wsClose as OrdersWsClose,
  wsMessage as OrdersWsMessage,
  wsError as OrdersWsError,
} from "./orders/actions";
import {
  socketMiddleware,
  TWSActionTypes,
} from "./middleware/socketMiddleware";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  orderDetails: orderSliceReducer,
  auth: authSliceReducer,
  orders: ordersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const wsOrdersActions: TWSActionTypes = {
  wsConnect: OrdersWsConnect,
  wsDisconnect: OrdersWsDisconnect,
  onClose: OrdersWsClose,
  onOpen: OrdersWsOpen,
  onError: OrdersWsError,
  onMessage: OrdersWsMessage,
};

const ordersMiddleware = socketMiddleware(wsOrdersActions);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(ordersMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type ThunkAPI = {
  dispatch: AppDispatch;
};

export default store;
