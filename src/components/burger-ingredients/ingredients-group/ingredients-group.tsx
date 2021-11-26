import React, { useMemo } from "react";
import styles from "./ingredients-group.module.css";
import { TIngredient } from "../../../utils/types";
import IngredientItem from "../ingredient-item/ingredient-item";
import { useAppSelector } from "../../../services";

interface IIngredientsGroupProps {
  name: string;
  showDetails: (item: TIngredient) => void;
  ingredients: Array<TIngredient>;
}

const IngredientsGroup: React.FC<IIngredientsGroupProps> = ({
  name,
  showDetails,
  ingredients,
}) => {
  const { bun, ingredients: constructorIngredients } = useAppSelector(
    (state) => state.burgerConstructor
  );

  const statistics = useMemo(() => {
    let res = new Map<string, number>();

    if (ingredients.length === 0) {
      return res;
    }

    const groupType = ingredients[0].type;

    if (groupType === "bun") {
      ingredients.map((el) =>
        res.set(el._id, bun && bun._id === el._id ? 2 : 0)
      );
      return res;
    }

    const items = constructorIngredients.filter((el) => el.type === groupType);

    return items.reduce(
      (acc: Map<string, number>, e) =>
        acc.set(e._id, (acc.get(e._id) || 0) + 1),
      res
    );
  }, [ingredients, constructorIngredients, bun]);

  return (
    <>
      <p className="text text_type_main-medium mb-6">{name}</p>
      <div data-test={name} className={styles.content}>
        {ingredients.map((item) => (
          <IngredientItem
            key={item._id}
            item={item}
            count={statistics.get(item._id) || 0}
            showDetails={showDetails}
          />
        ))}
      </div>
    </>
  );
};

export default IngredientsGroup;
