import styles from "./burger-constructor.module.css";
import ConstructorItem from "./constructor-item";
import PlaceholderItem from "./placeholder-item/placeholder-item";
import React, { useCallback } from "react";
import {
  removeIngredient,
  setBun,
  addIngredient,
  moveIngredient,
} from "../../services/constructorSlice";
import { useDrop } from "react-dnd";
import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "../../services";
import { TIngredient } from "../../utils/types";

const ConstructorArea: React.FC = () => {
  const { bun, ingredients: constructorIngredients } = useAppSelector(
    (state) => state.burgerConstructor
  );

  const dispatch = useAppDispatch();

  const [{ isBunOver, isIngredientOver }, dropTarget] = useDrop({
    accept: ["bun", "sauce", "main"],
    canDrop: (item: TIngredient) => {
      return item.index === undefined;
    },
    drop: (item: TIngredient) => {
      if (item.type === "bun") {
        dispatch(setBun(item));
      } else {
        dispatch(addIngredient({ ...item, key: uuid() }));
      }
    },
    collect: (monitor) => ({
      isBunOver: monitor.isOver() && monitor.getItemType() === "bun",
      isIngredientOver: monitor.isOver() && monitor.getItemType() !== "bun",
    }),
  });

  const removeItem = (item: TIngredient) => {
    dispatch(removeIngredient(item));
  };

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(moveIngredient({ fromIndex: dragIndex, toIndex: hoverIndex }));
    },
    [constructorIngredients]
  );

  return (
    <div className={styles.constructor_area} ref={dropTarget}>
      <div className="pr-4">
        {bun ? (
          <ConstructorItem type="top" item={bun} />
        ) : (
          <PlaceholderItem type="top" highlighted={isBunOver} />
        )}
      </div>

      <div className={styles.ingredients}>
        <div className={`${styles.scroll_area} custom-scroll`}>
          {constructorIngredients.length ? (
            constructorIngredients.map((item, index: number) => (
              <ConstructorItem
                key={item.key}
                item={item}
                index={index}
                onRemove={removeItem}
                moveItem={moveItem}
              />
            ))
          ) : (
            <PlaceholderItem highlighted={isIngredientOver} />
          )}
        </div>
      </div>

      <div className="pr-4">
        {bun ? (
          <ConstructorItem type="bottom" item={bun} />
        ) : (
          <PlaceholderItem type="bottom" highlighted={isBunOver} />
        )}
      </div>
    </div>
  );
};

export default ConstructorArea;
