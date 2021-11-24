import constructorReducer, {
  addIngredient,
  clearConstructor,
  setBun,
  TConstructorSliceState,
} from "./constructorSlice";
import { TIngredient } from "../utils/types";

describe("constructorSlice", () => {
  const initialState: TConstructorSliceState = {
    bun: null,
    ingredients: [],
  };

  const ingredient: TIngredient = {
    _id: "fd12278318",
    name: "First",
    type: "bun",
    proteins: 50,
    fat: 60,
    carbohydrates: 70,
    calories: 200,
    price: 1000,
    image: "image",
    image_mobile: "mobile",
    image_large: "large",
    key: "hjkhjk",
  };

  it("should return the initial state", () => {
    expect(constructorReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle set bun", () => {
    const result = constructorReducer(initialState, setBun(ingredient));
    expect(result.bun).toEqual(ingredient);
  });

  it("should handle add ingredient", () => {
    const result = constructorReducer(initialState, addIngredient(ingredient));

    expect(result.ingredients).toHaveLength(1);
    expect(result.ingredients[0]).toEqual(ingredient);
  });

  it("should handle remove ingredient", () => {
    let state = {};
  });

  it("should handle clear constructor", () => {
    let state = {
      bun: ingredient,
      ingredients: [ingredient],
    };

    const result = constructorReducer(state, clearConstructor());

    expect(result.bun).toBeNull();
    expect(result.ingredients).toEqual([]);
  });
});
