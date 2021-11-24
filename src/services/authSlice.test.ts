import authReducer, {
  checkResetPassword,
  clearPasswordReset,
  getUser,
  login,
  logout,
  register,
  resetPassword,
  TAuthSliceState,
  updateUser,
} from "./authSlice";
import { TAuthResult, TUser } from "../utils/types";
import authSlice from "./authSlice";

describe("authSlice", () => {
  const initialState: TAuthSliceState = {
    accessToken: null,
    refreshToken: null,
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

  it("should return the initial state", () => {
    expect(authReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle 'clearPasswordReset'", () => {
    const result = authReducer(initialState, clearPasswordReset());
    expect(result.isPasswordWasReset).toEqual(false);
  });

  it("should handle pending login", () => {
    const action = { type: login.pending.type };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toEqual(true);
    expect(result.hasError).toEqual(false);
    expect(result.isLoggedIn).toEqual(false);
    expect(result.user).toBeNull();
  });

  it("should handle successful login", () => {
    const authResult: TAuthResult = {
      user: {
        name: "Vasya",
        password: "8888",
        email: "xxx@yandex.ru",
      },
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    };

    const action = { type: login.fulfilled.type, payload: authResult };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toEqual(false);
    expect(result.hasError).toEqual(false);
    expect(result.user).toEqual(authResult.user);
    expect(result.accessToken).toEqual(authResult.accessToken);
    expect(result.refreshToken).toEqual(authResult.refreshToken);
    expect(result.isLoggedIn).toEqual(true);
    expect(result.isLoggedOut).toEqual(false);
  });

  it("should handle failed login", () => {
    const action = { type: login.rejected.type };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toEqual(false);
    expect(result.hasError).toEqual(true);
    expect(result.user).toBeNull();
    expect(result.isLoggedIn).toEqual(false);
  });

  it("should handle pending register", () => {
    const action = { type: register.pending.type };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toEqual(true);
    expect(result.hasError).toEqual(false);
    expect(result.user).toBeNull();
  });

  it("should handle successful register", () => {
    const authResult: TAuthResult = {
      user: {
        name: "Petya",
        password: "9999",
        email: "yyy@yandex.ru",
      },
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    };

    const action = { type: register.fulfilled.type, payload: authResult };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toEqual(false);
    expect(result.hasError).toEqual(false);
    expect(result.user).toEqual(authResult.user);
    expect(result.accessToken).toEqual(authResult.accessToken);
    expect(result.refreshToken).toEqual(authResult.refreshToken);
    expect(result.isLoggedIn).toEqual(true);
    expect(result.isLoggedOut).toEqual(false);
  });

  it("should handle failed register", () => {
    const action = { type: register.rejected.type };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toEqual(false);
    expect(result.hasError).toEqual(true);
    expect(result.user).toBeNull();
  });

  it("should handle pending check reset password", () => {
    const action = { type: checkResetPassword.pending.type };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toEqual(true);
    expect(result.hasError).toEqual(false);
    expect(result.isResetPassword).toEqual(false);
  });

  it("should handle successful check reset password", () => {
    const action = { type: checkResetPassword.fulfilled.type };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toEqual(false);
    expect(result.hasError).toEqual(false);
    expect(result.isResetPassword).toEqual(true);
  });

  it("should handle failed check reset password", () => {
    const action = { type: checkResetPassword.rejected.type };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toEqual(false);
    expect(result.hasError).toEqual(true);
    expect(result.isResetPassword).toEqual(false);
  });

  it("should handle pending reset password", () => {
    const action = { type: resetPassword.pending.type };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toEqual(true);
    expect(result.hasError).toEqual(false);
    expect(result.isResetPassword).toEqual(true);
    expect(result.isPasswordWasReset).toEqual(false);
  });

  it("should handle successful reset password", () => {
    const action = { type: resetPassword.fulfilled.type };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toEqual(false);
    expect(result.hasError).toEqual(false);
    expect(result.isResetPassword).toEqual(false);
    expect(result.isPasswordWasReset).toEqual(true);
  });

  it("should handle failed reset password", () => {
    const action = { type: resetPassword.rejected.type };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toEqual(false);
    expect(result.hasError).toEqual(true);
    expect(result.isResetPassword).toEqual(true);
    expect(result.isPasswordWasReset).toEqual(false);
  });

  it("should handle pending get user", () => {
    const action = { type: getUser.pending.type };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toEqual(true);
    expect(result.hasError).toEqual(false);
  });

  it("should handle pending get user", () => {
    const user: TUser = {
      name: "Kolya",
      password: "admin",
      email: "kolya@yandex.ru",
    };

    const action = { type: getUser.fulfilled.type, payload: user };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toEqual(false);
    expect(result.hasError).toEqual(false);
    expect(result.user).toEqual(user);
  });

  it("should handle failed get user", () => {
    const action = { type: getUser.rejected.type };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toEqual(false);
    expect(result.hasError).toEqual(true);
  });

  it("should handle pending update user", () => {
    const action = { type: updateUser.pending.type };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toEqual(true);
    expect(result.hasError).toEqual(false);
  });

  it("should handle pending update user", () => {
    const user: TUser = {
      name: "Sergey",
      password: "mix",
      email: "serga@yandex.ru",
    };

    const action = { type: updateUser.fulfilled.type, payload: user };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toEqual(false);
    expect(result.hasError).toEqual(false);
    expect(result.user).toEqual(user);
  });

  it("should handle failed update user", () => {
    const action = { type: updateUser.rejected.type };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toEqual(false);
    expect(result.hasError).toEqual(true);
  });

  it("should handle pending logout", () => {
    const action = { type: logout.pending.type };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toEqual(true);
    expect(result.hasError).toEqual(false);
    expect(result.isLoggedOut).toEqual(false);
  });

  it("should handle successful logout", () => {
    const action = { type: logout.fulfilled.type };
    const result = authReducer(initialState, action);

    expect(result.isLoading).toEqual(false);
    expect(result.hasError).toEqual(false);
    expect(result.user).toBeNull();
    expect(result.accessToken).toEqual("");
    expect(result.refreshToken).toEqual("");
    expect(result.isLoggedIn).toEqual(false);
    expect(result.isLoggedOut).toEqual(true);
    expect(localStorage.removeItem).toHaveBeenCalledWith("accessToken");
    expect(localStorage.removeItem).toHaveBeenCalledWith("refreshToken");
  });

  it("should handle failed logout", () => {
    const action = { type: logout.rejected.type };
    const result = authSlice(initialState, action);

    expect(result.isLoading).toEqual(false);
    expect(result.hasError).toEqual(true);
    expect(result.isLoggedOut).toEqual(false);
  });
});
