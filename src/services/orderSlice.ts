import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/constants";
import { clearConstructor } from "./constructorSlice";
import { ThunkAPI } from "./index";
import { TCreatedOrder, TOrder } from "../utils/types";
import { fetchWithRefresh } from "../utils/auth";

export const createOrder = createAsyncThunk<TCreatedOrder, TOrder, ThunkAPI>(
  "order/postCreate",
  async (order, thunkAPI) => {
    const json = await fetchWithRefresh(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      } as HeadersInit,
      body: JSON.stringify(order),
    });

    if (json.success) {
      //thunkAPI.dispatch(clearConstructor());
      return { name: json.name, number: json.order.number } as TCreatedOrder;
    } else {
      return thunkAPI.rejectWithValue("");
    }
  }
);

type TOrderSliceState = {
  name: string;
  number: number;
  isLoading: boolean;
  hasError: boolean;
  isShown: boolean;
};

export const initialState: TOrderSliceState = {
  name: "",
  number: 0,
  isLoading: false,
  hasError: false,
  isShown: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    showOrderDetails: (state) => {
      state.isShown = true;
      state.isLoading = true;
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
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<TCreatedOrder>) => {
          state.isLoading = false;
          state.hasError = false;
          state.name = action.payload.name;
          state.number = action.payload.number;
        }
      )
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
