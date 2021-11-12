import React from "react";
import styles from "./ingredients.module.css";
import { useAppSelector } from "../../services";
import { TIngredient } from "../../utils/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";

function calculateCount<T>(arr: Array<T>, val: T): number {
  return arr.reduce((a: number, v: T) => (v === val ? a + 1 : a), 0);
}

interface IIngredientProps {
  ingredient: TIngredient;
  count: number;
}

const Ingredient: React.FC<IIngredientProps> = ({ ingredient, count }) => {
  return (
    <div className={styles.ingredient}>
      <div className={styles.illustration}>
        <div className={styles.border} />
        <img
          alt="Нет фото"
          src={ingredient.image_mobile}
          className={styles.image}
        />
      </div>
      <p className={styles.title}>{ingredient.name}</p>
      <p className={styles.price}>
        {`${count} x ${ingredient.price}`}
        <CurrencyIcon type="primary" />
      </p>
    </div>
  );
};

interface IIngredientsProps {
  ingredients: Array<string>;
}

const Ingredients: React.FC<IIngredientsProps> = ({ ingredients }) => {
  const { ingredientsMap } = useAppSelector((state) => state.ingredients);

  const orderIngredients = Array.from(new Set(ingredients));

  return (
    <div className={styles.ingredients}>
      <ul className={`${styles.list} custom-scroll`}>
        {orderIngredients.map((id) => {
          const item = ingredientsMap.get(id)!;
          return (
            <li key={item._id}>
              <Ingredient
                ingredient={item}
                count={calculateCount(ingredients, id)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Ingredients;
