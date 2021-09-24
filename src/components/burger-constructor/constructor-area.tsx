import styles from "./burger-constructor.module.css";
import ConstructorItem from "./constructor-item";
import PlaceholderItem from "./placeholder-item/placeholder-item";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeIngredient,
  setBun,
  addIngredient,
} from "../../services/constructorSlice";
import { useDrop } from "react-dnd";
import { v4 as uuid } from "uuid";

const ConstructorArea = () => {
  const { bun, ingredients: constructorIngredients } = useSelector(
    // @ts-ignore
    (state) => state.burgerConstructor
  );

  const dispatch = useDispatch();

  const [{ isBunOver, isIngredientOver }, dropTarget] = useDrop({
    accept: ["bun", "sauce", "main"],
    drop: (item) => {
      // @ts-ignore
      if (item.type === "bun") {
        dispatch(setBun(item));
      } else {
        // @ts-ignore
        dispatch(addIngredient({ ...item, key: uuid() }));
      }
    },
    collect: (monitor) => ({
      isBunOver: monitor.isOver() && monitor.getItemType() === "bun",
      isIngredientOver: monitor.isOver() && monitor.getItemType() !== "bun",
    }),
  });

  const removeItem = (item: any) => {
    dispatch(removeIngredient(item));
  };

  return (
    <div className={styles.constructor_area} ref={dropTarget}>
      <div className="pr-4">
        {bun ? (
          <ConstructorItem type="top" item={bun} />
        ) : (
          <PlaceholderItem type="top" highlighted={isBunOver} />
        )}
      </div>

      <div className={`${styles.scroll_area} custom-scroll`}>
        {constructorIngredients.length ? (
          constructorIngredients.map((item: any) => (
            <ConstructorItem key={item.key} item={item} onRemove={removeItem} />
          ))
        ) : (
          <PlaceholderItem highlighted={isIngredientOver} />
        )}
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
