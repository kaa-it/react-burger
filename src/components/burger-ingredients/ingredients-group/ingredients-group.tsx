import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredients-group.module.css";
import { ingredientPropTypes } from "../../../utils/types";
import IngredientItem from "../ingredient-item/ingredient-item";

// @ts-ignore
const IngredientsGroup = ({ name, showDetails, ingredients }) => {
  return (
    <>
      <p className="text text_type_main-medium mb-6">{name}</p>
      <div className={styles.content}>
        {ingredients.map((item: any) => (
          <IngredientItem
            key={item._id}
            item={item}
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
