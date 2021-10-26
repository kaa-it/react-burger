import ingredientsReducer from "./ingredientsSlice";
import constructorReducer from "./constructorSlice";
import orderSliceReducer from "./orderSlice";
import authSliceReducer from "./authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    orderDetails: orderSliceReducer,
    auth: authSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type ThunkAPI = {
  dispatch: AppDispatch;
};

export default store;
