import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./ingredients-group.module.css";
import { ingredientPropTypes } from "../../../utils/types";
import IngredientItem from "../ingredient-item/ingredient-item";
import { useSelector } from "react-redux";

// @ts-ignore
const IngredientsGroup = ({ name, showDetails, ingredients }) => {
  const { bun, ingredients: constructorIngredients } = useSelector(
    // @ts-ignore
    (state) => state.burgerConstructor
  );

  const statistics = useMemo(() => {
    if (ingredients.length === 0) {
      return {};
    }

    const groupType = ingredients[0].type;
    let res = new Map();

    if (groupType === "bun") {
      ingredients.map((el: any) =>
        res.set(el._id, bun && bun._id === el._id ? 1 : 0)
      );
      return res;
    }

    const items = constructorIngredients.filter(
      (el: any) => el.type === groupType
    );

    return items.reduce(
      (acc: any, e: any) => acc.set(e._id, (acc.get(e._id) || 0) + 1),
      res
    );
  }, [ingredients, constructorIngredients, bun]);

  return (
    <>
      <p className="text text_type_main-medium mb-6">{name}</p>
      <div className={styles.content}>
        {ingredients.map((item: any) => (
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

IngredientsGroup.propTypes = {
  name: PropTypes.string.isRequired,
  showDetails: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};

export default IngredientsGroup;
