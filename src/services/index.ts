import ingredientsReducer from "./ingredientsSlice";
import constructorReducer from "./constructorSlice";
import orderSliceReducer from "./orderSlice";
import authSliceReducer from "./authSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    orderDetails: orderSliceReducer,
    auth: authSliceReducer,
  },
});

export default store;
