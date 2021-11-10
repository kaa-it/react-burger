import React from "react";
import styles from "./ingredients.module.css";
import { useAppSelector } from "../../services";
import { TIngredient } from "../../utils/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";

interface IIngredientProps {
  ingredient: TIngredient;
}

const Ingredient: React.FC<IIngredientProps> = ({ ingredient }) => {
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
        {"1 x 480"}
        <CurrencyIcon type="primary" />
      </p>
    </div>
  );
};

const Ingredients: React.FC = () => {
  const { ingredients } = useAppSelector((state) => state.ingredients);

  return (
    <div className={styles.ingredients}>
      <ul className={`${styles.list} custom-scroll`}>
        {ingredients.map((item, i) => (
          <li key={i}>
            <Ingredient ingredient={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ingredients;
