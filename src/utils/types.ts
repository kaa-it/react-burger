import * as H from "history";

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  index?: number;
  key?: string;
};

export type TDragIngredientParams = {
  fromIndex: number;
  toIndex: number;
};

export type TOrder = {
  ingredients: Array<string>;
};

export type TCreatedOrder = {
  name: string;
  number: number;
};

export type TCredentials = {
  email: string;
  password: string;
};

export type TUser = {
  name: string;
  password?: string;
  email: string;
};

export type TAuthResult = {
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export type TResetPasswordArgs = {
  token: string;
  password: string;
};

export interface IModalLocationState {
  background?: H.Location;
}

export interface IIDParams {
  id: string;
}

export type TOrderInfo = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TOrders = {
  orders: Array<TOrderInfo>;
  total: number;
  totalToday: number;
};
