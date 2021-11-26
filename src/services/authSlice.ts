import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/constants";
import { fetchWithRefresh } from "../utils/auth";
import {
  TCredentials,
  TAuthResult,
  TUser,
  TResetPasswordArgs,
} from "../utils/types";
import { ThunkAPI } from "./index";

export const login = createAsyncThunk<TAuthResult, TCredentials, ThunkAPI>(
  "auth/login",
  async (credentials, thunkAPI) => {
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

export const register = createAsyncThunk<TAuthResult, TUser, ThunkAPI>(
  "auth/register",
  async (userInfo, thunkAPI) => {
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

export const checkResetPassword = createAsyncThunk<void, string, ThunkAPI>(
  "auth/forgot-password",
  async (email, thunkAPI) => {
    const res = await fetch(`${baseUrl}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email }),
    });

    const json = await res.json();

    if (json.success) {
      return;
    } else {
      return thunkAPI.rejectWithValue("");
    }
  }
);

export const resetPassword = createAsyncThunk<
  void,
  TResetPasswordArgs,
  ThunkAPI
>("auth/reset-password", async (form: any, thunkAPI) => {
  const res = await fetch(`${baseUrl}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(form),
  });

  const json = await res.json();

  if (json.success) {
    return;
  } else {
    return thunkAPI.rejectWithValue("");
  }
});

export const getUser = createAsyncThunk<TUser, void, ThunkAPI>(
  "auth/get-user",
  async (empty, thunkAPI) => {
    const json = await fetchWithRefresh(`${baseUrl}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: localStorage.getItem("accessToken"),
      } as HeadersInit,
    });

    if (json.success) {
      return json.user;
    } else {
      return thunkAPI.rejectWithValue("");
    }
  }
);

export const updateUser = createAsyncThunk<TUser, TUser, ThunkAPI>(
  "auth/update-user",
  async (userInfo, thunkAPI) => {
    const json = await fetchWithRefresh(`${baseUrl}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: localStorage.getItem("accessToken"),
      } as HeadersInit,
      body: JSON.stringify(userInfo),
    });

    if (json.success) {
      return json.user;
    } else {
      return thunkAPI.rejectWithValue("");
    }
  }
);

export const logout = createAsyncThunk<void, void, ThunkAPI>(
  "auth/logout",
  async (empty, thunkAPI) => {
    const json = await fetchWithRefresh(`${baseUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: localStorage.getItem("accessToken"),
      } as HeadersInit,
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    });

    if (json.success) {
      return;
    } else {
      return thunkAPI.rejectWithValue("");
    }
  }
);

export type TAuthSliceState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: TUser | null;
  isResetPassword: boolean;
  isPasswordWasReset: boolean;
  isLoading: boolean;
  hasError: boolean;
  isShown: boolean;
  isLoggedIn: boolean;
  isFetchedUser: boolean;
  isLoggedOut: boolean;
};

export const initialState: TAuthSliceState = {
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
  isLoggedOut: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
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
      .addCase(login.fulfilled, (state, action: PayloadAction<TAuthResult>) => {
        state.isLoading = false;
        state.hasError = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.isLoggedOut = false;
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
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<TAuthResult>) => {
          state.isLoading = false;
          state.hasError = false;
          state.user = action.payload.user;
          state.isLoggedIn = true;
          state.isLoggedOut = false;
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
        }
      )
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
      .addCase(checkResetPassword.fulfilled, (state) => {
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
      .addCase(resetPassword.fulfilled, (state) => {
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
      .addCase(getUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.hasError = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.isLoading = false;
        state.hasError = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.isLoggedOut = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.hasError = false;
        state.isLoggedOut = true;
        state.isLoggedIn = false;
        state.accessToken = "";
        state.refreshToken = "";
        state.user = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        state.isLoggedOut = false;
      });
  },
});

export const { clearPasswordReset } = authSlice.actions;

export default authSlice.reducer;
