import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/constants";

export const createOrder = createAsyncThunk(
  "order/postCreate",
  async (order, thunkAPI) => {
    const res = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    const json = await res.json();

    if (json.success) {
      return { name: json.name, number: json.order.number };
    } else {
      thunkAPI.rejectWithValue("");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    name: "",
    number: 0,
    isLoading: false,
    hasError: false,
    isShown: false,
  },
  reducers: {
    showOrderDetails: (state) => {
      state.isShown = true;
    },
    closeOrderDetails: (state) => {
      state.isShown = false;
      state.name = "";
      state.number = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.name = "";
        state.number = 0;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        // @ts-ignore
        state.name = action.payload.name;
        // @ts-ignore
        state.number = action.payload.number;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        state.name = "";
        state.number = 0;
      });
  },
});

export const { showOrderDetails, closeOrderDetails } = orderSlice.actions;

export default orderSlice.reducer;
