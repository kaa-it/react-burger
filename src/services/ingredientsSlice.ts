import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/constants";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchAll",
  async () => {
    const res = await fetch(`${baseUrl}/ingredients`);
    const json = await res.json();
    return json.data;
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: { ingredients: [], isLoading: false, hasError: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.ingredients = [];
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        state.ingredients = [];
      });
  },
});

export default ingredientsSlice.reducer;
