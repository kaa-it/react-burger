import ingredientsReducer from "./ingredientsSlice";
import constructorReducer from "./constructorSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
  },
});

export default store;
