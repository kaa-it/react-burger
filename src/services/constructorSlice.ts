import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TDragIngredientParams, TIngredient } from "../utils/types";

export type TConstructorSliceState = {
  bun: TIngredient | null;
  ingredients: Array<TIngredient>;
};

export const initialState: TConstructorSliceState = {
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients = state.ingredients.filter(
        (el: TIngredient) => el.key !== action.payload.key
      );
    },
    moveIngredient: (state, action: PayloadAction<TDragIngredientParams>) => {
      state.ingredients.splice(
        action.payload.toIndex,
        0,
        state.ingredients.splice(action.payload.fromIndex, 1)[0]
      );
    },
    clearConstructor: (state) => {
      state.ingredients = [];
      state.bun = null;
    },
  },
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
} = constructorSlice.actions;

export default constructorSlice.reducer;
