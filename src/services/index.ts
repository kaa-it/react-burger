import ingredientsReducer from "./ingredientsSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
  },
});

export default store;
