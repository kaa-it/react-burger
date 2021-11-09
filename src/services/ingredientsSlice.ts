import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/constants";
import { TIngredient } from "../utils/types";

export const fetchIngredients = createAsyncThunk<Array<TIngredient>>(
  "ingredients/fetchAll",
  async () => {
    const res = await fetch(`${baseUrl}/ingredients`);
    const json = await res.json();
    return json.data as Array<TIngredient>;
  }
);

type TIngredientsSliceState = {
  ingredients: Array<TIngredient>;
  ingredientsMap: Map<string, TIngredient>;
  isLoading: boolean;
  hasError: boolean;
  currentTab: string;
};

const initialState: TIngredientsSliceState = {
  ingredients: [],
  ingredientsMap: new Map<string, TIngredient>(),
  isLoading: false,
  hasError: false,
  currentTab: "bun",
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    switchTab: (state, action: PayloadAction<string>) => {
      state.currentTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.ingredients = [];
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<Array<TIngredient>>) => {
          state.isLoading = false;
          state.hasError = false;
          state.ingredients = action.payload;
          state.ingredients.forEach((item: TIngredient) => {
            state.ingredientsMap.set(item._id, item);
          });
        }
      )
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        state.ingredients = [];
      });
  },
});

export const { switchTab } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
