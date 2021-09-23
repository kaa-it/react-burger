import { createSlice } from "@reduxjs/toolkit";

const constructorSlice = createSlice({
  name: "constructor",
  initialState: { bun: null, ingredients: [] },
  reducers: {
    setBun: (state, action) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action) => {
      // @ts-ignore
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (el: any) => el.key !== action.payload.key
      );
    },
  },
});

export const { setBun, addIngredient, removeIngredient } =
  constructorSlice.actions;

export default constructorSlice.reducer;
