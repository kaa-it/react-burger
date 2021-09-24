import React, { useMemo } from "react";
import styles from "./burger-constructor.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";

import ConstructorItem from "./constructor-item";
import { useSelector, useDispatch } from "react-redux";
import { removeIngredient } from "../../services/constructorSlice";
import { showOrderDetails, closeOrderDetails } from "../../services/orderSlice";

const BurgerConstructor = () => {
  const { bun, ingredients: constructorIngredients } = useSelector(
    // @ts-ignore
    (state) => state.burgerConstructor
  );

  // @ts-ignore
  const { isShown } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();

  const totalPrice = useMemo(() => {
    let totalPrice = constructorIngredients.reduce(
      (acc: number, item: any) => item.price + acc,
      0
    );

    if (bun !== null) {
      totalPrice += bun.price * 2;
    }

    return totalPrice;
  }, [bun, constructorIngredients]);

  const createOrder = () => {
    if (bun !== null) {
      dispatch(showOrderDetails());
    } else {
      console.log("Unable to create order without buns");
    }
  };

  const closeOrder = () => {
    dispatch(closeOrderDetails());
  };

  const removeItem = (item: any) => {
    dispatch(removeIngredient(item));
  };

  return (
    <div className={`${styles.burger_constructor} pt-25 pl-4 pr-4`}>
      <div className={styles.constructor_area}>
        {bun === null && constructorIngredients.length === 0 && (
          <p
            className="text text_type_main-medium"
            style={{ alignSelf: "center" }}
          >
            Пусто
          </p>
        )}

        <div className="pr-4">
          {bun !== null && <ConstructorItem type="top" item={bun} />}
        </div>

        <div className={`${styles.scroll_area} custom-scroll`}>
          {constructorIngredients.map((item: any) => (
            <ConstructorItem key={item.key} item={item} onRemove={removeItem} />
          ))}
        </div>

        <div className="pr-4">
          {bun !== null && <ConstructorItem type="bottom" item={bun} />}
        </div>
      </div>
      <div className={styles.info}>
        <p className={styles.price}>
          {totalPrice}
          <CurrencyIcon type="primary" />
        </p>
        <Button type="primary" onClick={createOrder} size="large">
          Оформить заказ
        </Button>
      </div>
      {isShown && (
        <Modal onClose={closeOrder}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
