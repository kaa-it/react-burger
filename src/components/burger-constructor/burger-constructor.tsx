import React, { useContext, useState } from "react";
import styles from "./burger-constructor.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";

import {
  BunContext,
  ConstructorIngredientsContext,
  TotalPriceContext,
} from "../../services/constructorContext";
import ConstructorItem from "./constructor-item";

const BurgerConstructor = () => {
  const [orderDetailsVisible, setOrderDetailsVisible] = useState(false);

  // @ts-ignore
  const { bun } = useContext(BunContext);
  // @ts-ignore
  const { constructorIngredients, setConstructorIngredients } = useContext(
    ConstructorIngredientsContext
  );
  // @ts-ignore
  const { totalPriceState, totalPriceDispatcher } =
    useContext(TotalPriceContext);

  const createOrder = () => {
    if (bun !== null) {
      setOrderDetailsVisible(true);
    } else {
      console.log("Unable to create order without buns");
    }
  };

  const closeOrderDetails = () => {
    setOrderDetailsVisible(false);
  };

  const removeItem = (item: any) => {
    let rest = constructorIngredients.filter((el: any) => el.key !== item.key);
    setConstructorIngredients(rest);
    totalPriceDispatcher({ type: "remove", payload: item.price });
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
          {totalPriceState.totalPrice}
          <CurrencyIcon type="primary" />
        </p>
        <Button type="primary" onClick={createOrder} size="large">
          Оформить заказ
        </Button>
      </div>
      {orderDetailsVisible && (
        <Modal onClose={closeOrderDetails}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
