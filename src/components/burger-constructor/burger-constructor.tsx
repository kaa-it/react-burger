import React, { useMemo } from "react";
import styles from "./burger-constructor.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import Modal from "../modal/modal";
import OrderDetails from "./order-details/order-details";

import { showOrderDetails, closeOrderDetails } from "../../services/orderSlice";
import ConstructorArea from "./constructor-area";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services";

const BurgerConstructor: React.FC = () => {
  const { bun, ingredients: constructorIngredients } = useAppSelector(
    (state) => state.burgerConstructor
  );

  const { isShown } = useAppSelector((state) => state.orderDetails);

  const { accessToken } = useAppSelector((state) => state.auth);

  const history = useHistory();

  const dispatch = useAppDispatch();

  const totalPrice = useMemo(() => {
    let totalPrice = constructorIngredients.reduce(
      (acc: number, item) => item.price + acc,
      0
    );

    if (bun !== null) {
      totalPrice += bun.price * 2;
    }

    return totalPrice;
  }, [bun, constructorIngredients]);

  const createOrder = () => {
    if (bun === null) {
      console.log("Unable to create order without buns");
      return;
    }

    if (!accessToken) {
      history.push({ pathname: "/login", state: { from: "/" } });
      return;
    }

    dispatch(showOrderDetails());
  };

  const closeOrder = () => {
    dispatch(closeOrderDetails());
  };

  return (
    <div className={`${styles.burger_constructor} pt-25 pl-4 pr-4`}>
      <ConstructorArea />
      <div className={styles.info}>
        <p className={styles.price}>
          {totalPrice}
          <CurrencyIcon type="primary" />
        </p>
        <Button
          data-test="create_order"
          type="primary"
          onClick={createOrder}
          size="large"
        >
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
