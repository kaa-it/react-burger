import ordersReducer, { getOrder, initialState } from "./reducer";
import { wsClose, wsError, wsMessage, wsOpen } from "./actions";
import { TOrders } from "../../utils/types";

describe("ordersReducer", () => {
  const orders: TOrders = {
    orders: [
      {
        _id: "fg123456",
        ingredients: ["hj323232", "jk3erere"],
        status: "done",
        name: "Burger",
        number: 3345,
        createdAt: "12:45:56",
        updatedAt: "14:45:22",
      },
    ],
    total: 2,
    totalToday: 1,
  };

  it("should return the initial state", () => {
    expect(ordersReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle wsOpen action", () => {
    expect(ordersReducer(initialState, wsOpen)).toEqual(initialState);
  });

  it("should handle wsClose action", () => {
    const state = {
      ...initialState,
      orders,
      connectionError: "error",
    };

    const result = ordersReducer(state, wsClose);

    expect(result).toEqual(initialState);
  });

  it("should handle wsError action", () => {
    const error: string = "error";

    const result = ordersReducer(initialState, wsError(error));

    expect(result).toEqual({
      ...initialState,
      connectionError: error,
    });
  });

  it("should handle wsMessage action", () => {
    const result = ordersReducer(initialState, wsMessage(orders));

    expect(result).toEqual({
      ...initialState,
      orders,
    });
  });

  it("should handle successful get order", () => {
    const action = { type: getOrder.fulfilled.type, payload: orders.orders };
    const result = ordersReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      orders: {
        orders: orders.orders,
        total: 1,
        totalToday: 1,
      },
    });
  });
});
