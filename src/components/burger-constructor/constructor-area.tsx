import styles from "./burger-constructor.module.css";
import ConstructorItem from "./constructor-item";
import PlaceholderItem from "./placeholder-item/placeholder-item";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeIngredient } from "../../services/constructorSlice";

const ConstructorArea = () => {
  const { bun, ingredients: constructorIngredients } = useSelector(
    // @ts-ignore
    (state) => state.burgerConstructor
  );

  const dispatch = useDispatch();

  const removeItem = (item: any) => {
    dispatch(removeIngredient(item));
  };

  return (
    <div className={styles.constructor_area}>
      <div className="pr-4">
        {bun ? (
          <ConstructorItem type="top" item={bun} />
        ) : (
          <PlaceholderItem type="top" />
        )}
      </div>

      <div className={`${styles.scroll_area} custom-scroll`}>
        {constructorIngredients.length ? (
          constructorIngredients.map((item: any) => (
            <ConstructorItem key={item.key} item={item} onRemove={removeItem} />
          ))
        ) : (
          <PlaceholderItem />
        )}
      </div>

      <div className="pr-4">
        {bun ? (
          <ConstructorItem type="bottom" item={bun} />
        ) : (
          <PlaceholderItem type="bottom" />
        )}
      </div>
    </div>
  );
};

export default ConstructorArea;
