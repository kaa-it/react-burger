import React from "react";
import styles from "./ingredient-item.module.css";
import { TIngredient } from "../../../utils/types";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/counter";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import { DragPreviewImage, useDrag } from "react-dnd";

interface IngredientItemProps {
  item: TIngredient;
  showDetails: (item: TIngredient) => void;
  count: number;
}

const IngredientItem: React.FC<IngredientItemProps> = ({
  item,
  showDetails,
  count,
}) => {
  const handleClick = () => {
    showDetails(item);
  };

  const [{ isDragging }, ref, preview] = useDrag({
    type: item.type,
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <>
      <DragPreviewImage connect={preview} src={item.image}/>
      <div
        className={styles.ingredient_item}
        data-test={item.name}
        ref={ref}
        style={{ opacity }}
      >
        <div className={styles.content} onClick={handleClick}>
          <img
            alt="Нет фото"
            src={item.image}
            className={styles.illustration}
          />
          <p className={styles.price}>
            {item.price}
            <CurrencyIcon type="primary" />
          </p>
          <p className={styles.ingredient_item_text}>{item.name}</p>
        </div>
        {count > 0 && <Counter size="default" count={count} />}
      </div>
    </>
  );
};

export default IngredientItem;
