import React from "react";
import styles from "./ingredient-item.module.css";
import { ingredientPropTypes } from "../../../utils/types";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";

const IngredientItem = ({ item, showDetails, count }: any) => {
  const handleClick = () => {
    showDetails(item);
  };

  const [{ opacity }, ref] = useDrag({
    type: item.type,
    item: item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  return (
    <div
      className={styles.ingredient_item}
      ref={ref}
      style={{ opacity: opacity }}
    >
      <div className={styles.content} onClick={handleClick}>
        <img alt="Нет фото" src={item.image} className={styles.illustration} />
        <p className={styles.price}>
          {item.price}
          <CurrencyIcon type="primary" />
        </p>
        <p className={styles.ingredient_item_text}>{item.name}</p>
      </div>
      {count > 0 && <Counter size="default" count={count} />}
    </div>
  );
};

IngredientItem.propTypes = {
  item: ingredientPropTypes.isRequired,
  showDetails: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default IngredientItem;
