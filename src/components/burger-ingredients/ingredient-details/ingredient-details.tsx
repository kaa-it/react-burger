import React from "react";
import styles from "./ingredient-details.module.css";
import { ingredientPropTypes } from "../../../utils/types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const IngredientDetails = ({ ingredient, onClose }: any) => {
  const onClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.ingredient_details} onClick={onClick}>
      <div className={styles.header}>
        <p className="text text_type_main-large">Детали ингредиента</p>
        <CloseIcon onClick={onClose} type="primary" />
      </div>
      <img
        alt="Нет фото"
        src={ingredient.image}
        className={`${styles.illustration} mb-4`}
      />
      <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
      <div className={styles.data}>
        <div className={styles.data_item}>
          <p className="text text_type_main-default mb-2">Калории,ккал</p>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </div>
        <div className={styles.data_item}>
          <p className="text text_type_main-default mb-2">Белки, г</p>
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </div>
        <div className={styles.data_item}>
          <p className="text text_type_main-default mb-2">Жиры, г</p>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </div>
        <div className={styles.data_item}>
          <p className="text text_type_main-default mb-2">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: ingredientPropTypes,
  onClose: PropTypes.func.isRequired,
};

export default IngredientDetails;
