import { createSlice } from "@reduxjs/toolkit";

const ingredientDetailsSlice = createSlice({
  name: "ingredientDetails",
  initialState: { isShown: false, ingredient: {} },
  reducers: {
    showDetails: (state, action) => {
      state.ingredient = action.payload;
      state.isShown = true;
    },
    closeDetails: (state) => {
      state.ingredient = {};
      state.isShown = false;
    },
  },
});

export const { showDetails, closeDetails } = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;
