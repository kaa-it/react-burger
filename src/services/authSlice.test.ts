import authReducer, {
  clearPasswordReset,
  login,
  TAuthSliceState,
} from "./authSlice";
import { TAuthResult } from "../utils/types";

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

  it("should handle 'clearPasswordReset", () => {
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
});
