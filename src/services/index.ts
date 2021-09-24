import ingredientsReducer from "./ingredientsSlice";
import constructorReducer from "./constructorSlice";
import ingredientDetailsReducer from "./ingredientDetailsSlice";
import orderSliceReducer from "./orderSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderSliceReducer,
  },
});

export default store;
