import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/constants";
import { fetchWithRefresh } from "../utils/auth";

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
      return {
        user: json.user,
        accessToken: json.accessToken,
        refreshToken: json.refreshToken,
      };
    } else {
      return thunkAPI.rejectWithValue("");
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
      return {
        user: json.user,
        accessToken: json.accessToken,
        refreshToken: json.refreshToken,
      };
    } else {
      return thunkAPI.rejectWithValue("");
    }
  }
);

export const checkResetPassword = createAsyncThunk(
  "auth/forgot-password",
  async (email: any, thunkAPI) => {
    const res = await fetch(`${baseUrl}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email }),
    });

    const json = await res.json();

    if (json.success) {
      return {};
    } else {
      return thunkAPI.rejectWithValue("");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async (form: any, thunkAPI) => {
    const res = await fetch(`${baseUrl}/password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(form),
    });

    const json = await res.json();

    if (json.success) {
      return {};
    } else {
      return thunkAPI.rejectWithValue("");
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/get-user",
  async (empty, thunkAPI) => {
    const json = await fetchWithRefresh(`${baseUrl}/auth/user`, {
      method: "GET",
      // @ts-ignore
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: localStorage.getItem("accessToken"),
      },
    });

    if (json.success) {
      return { user: json.user };
    } else {
      return thunkAPI.rejectWithValue("");
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/update-user",
  async (userInfo: any, thunkAPI) => {
    const json = await fetchWithRefresh(`${baseUrl}/auth/user`, {
      method: "PATCH",
      // @ts-ignore
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(userInfo),
    });

    if (json.success) {
      return { user: json.user };
    } else {
      return thunkAPI.rejectWithValue("");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    user: null,
    isResetPassword: false,
    isPasswordWasReset: false,
    isLoading: false,
    hasError: false,
    isShown: false,
    isLoggedIn: false,
    isFetchedUser: false,
  },
  reducers: {
    clearPasswordReset: (state) => {
      state.isPasswordWasReset = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        // @ts-ignore
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        state.user = null;
        state.isLoggedIn = false;
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
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        state.user = null;
      })
      .addCase(checkResetPassword.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.isResetPassword = false;
      })
      .addCase(checkResetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.isResetPassword = true;
      })
      .addCase(checkResetPassword.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        state.isResetPassword = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.isResetPassword = true;
        state.isPasswordWasReset = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        state.isResetPassword = false;
        state.isPasswordWasReset = true;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        state.isResetPassword = true;
        state.isPasswordWasReset = false;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        // @ts-ignore
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;
        // @ts-ignore
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { clearPasswordReset } = authSlice.actions;

export default authSlice.reducer;
