import React, { useEffect, useState } from "react";
import styles from "./order-details.module.css";
import done from "../../../images/done.png";

import { baseUrl } from "../../../utils/constants";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const { bun, ingredients: constructorIngredients } = useSelector(
    // @ts-ignore
    (state) => state.burgerConstructor
  );

  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    number: 0,
    name: "",
  });

  useEffect(() => {
    const createOrder = async (url: string, order: any) => {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        });
        const json = await res.json();

        console.log(json);

        if (json.success) {
          setState({
            name: json.name,
            number: json.order.number,
            hasError: false,
            isLoading: false,
          });
        } else {
          setState({ ...state, hasError: true, isLoading: false });
        }
      } catch (err) {
        setState({ ...state, hasError: true, isLoading: false });
      }
    };

    setState({ ...state, hasError: false, isLoading: true });

    let ingredients = constructorIngredients.map((el: any) => el._id);
    let order = { ingredients: [bun._id, ...ingredients, bun._id] };
    //let order = [bun._id, ...ingredients];

    createOrder(`${baseUrl}/orders`, order);
  }, []);

  return (
    <div className={styles.order_details}>
      {state.isLoading && (
        <p className="text text_type_main-medium">Создание заказа...</p>
      )}
      {state.hasError && (
        <p className="text text_type_main-medium">Не удалось создать заказ</p>
      )}
      {!state.isLoading && !state.hasError && (
        <>
          <p
            className="text text_type_digits-large mb-8"
            style={{ textShadow: "0px 4px 32px #3333FF" }}
          >
            {state.number}
          </p>
          <p className="text text_type_main-medium mb-15">{state.name}</p>
          <img className={styles.image} alt="Принят" src={done} />
          <p className="text text_type_main-default mb-2">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
