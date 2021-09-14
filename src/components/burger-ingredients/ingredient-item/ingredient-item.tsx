import React, { useState } from "react";
import styles from "./ingredient-item.module.css";
import { ingredientPropTypes } from "../../../utils/types";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import Modal from "../../modal/modal";

const IngredientItem = ({ item }: any) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const showDetails = () => {
    setDetailsVisible(true);
  };

  const closeDetails = () => {
    setDetailsVisible(false);
  };

  return (
    <div className={styles.ingredient_item}>
      <div className={styles.content} onClick={showDetails}>
        <img alt="Нет фото" src={item.image} className={styles.illustration} />
        <p className={styles.price}>
          {item.price}
          <CurrencyIcon type="primary" />
        </p>
        <p className={styles.ingredient_item_text}>{item.name}</p>
      </div>
      <Counter size="default" count={1} />
      {detailsVisible && (
        <Modal onClose={closeDetails}>
          <p className="text text_type_main-medium">Детали</p>
        </Modal>
      )}
    </div>
  );
};

IngredientItem.propTypes = {
  item: ingredientPropTypes.isRequired,
};

export default IngredientItem;
