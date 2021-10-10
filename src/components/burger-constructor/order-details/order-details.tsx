import React, { useEffect } from "react";
import styles from "./order-details.module.css";
import done from "../../../images/done.png";

import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../../services/orderSlice";

const OrderDetails = () => {
  const { bun, ingredients: constructorIngredients } = useSelector(
    // @ts-ignore
    (state) => state.burgerConstructor
  );

  const { name, number, isLoading, hasError } = useSelector(
    // @ts-ignore
    (state) => state.orderDetails
  );

  const dispatch = useDispatch();

  useEffect(() => {
    let ingredients = constructorIngredients.map((el: any) => el._id);
    let order = { ingredients: [bun._id, ...ingredients, bun._id] };

    // @ts-ignore
    dispatch(createOrder(order));
  }, []);

  return (
    <div className={styles.order_details}>
      {isLoading && (
        <p className="text text_type_main-medium">Создание заказа...</p>
      )}
      {hasError && (
        <p className="text text_type_main-medium">Не удалось создать заказ</p>
      )}
      {!isLoading && !hasError && (
        <>
          <p
            className="text text_type_digits-large mb-8"
            style={{ textShadow: "0px 4px 32px #3333FF" }}
          >
            {number}
          </p>
          <p className="text_type_main-medium mb-15">{name}</p>
          <img className={styles.image} alt="Принят" src={done} />
          <p className="text_type_main-default mb-2">
            Ваш заказ начали готовить
          </p>
          <p className="text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
