import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/constants";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: any, thunkAPI) => {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(credentials),
    });

    const json = await res.json();

    if (json.success) {
      localStorage.setItem("accessToken", json.accessToken);
      localStorage.setItem("refreshToken", json.refreshToken);
      return { user: json.user };
    } else {
      thunkAPI.rejectWithValue("");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userInfo: any, thunkAPI) => {
    const res = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(userInfo),
    });

    const json = await res.json();

    if (json.success) {
      localStorage.setItem("accessToken", json.accessToken);
      localStorage.setItem("refreshToken", json.refreshToken);
      return { user: json.user };
    } else {
      thunkAPI.rejectWithValue("");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    user: null,
    isLoading: false,
    hasError: false,
    isShown: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        // @ts-ignore
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        state.user = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.user = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        // @ts-ignore
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
