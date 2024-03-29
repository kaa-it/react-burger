import React, { useCallback, useEffect } from "react";
import styles from "./orders.module.css";
import OrderCard from "../order-card/order-card";
import { useHistory, useRouteMatch } from "react-router-dom";
import { connect, disconnect } from "../../services/orders/actions";
import { useAppDispatch, useAppSelector } from "../../services";
import { TOrderInfo } from "../../utils/types";

const MY_ORDERS_URL = "wss:/norma.nomoreparties.space/orders";

const Orders: React.FC = () => {
  const { orders } = useAppSelector((state) => state.orders);

  const history = useHistory();

  const { url } = useRouteMatch();

  const dispatch = useAppDispatch();

  const match = useRouteMatch({
    path: "/profile/orders",
    strict: true,
    sensitive: true,
  });

  useEffect(() => {
    if (match) {
      const rawToken = localStorage.getItem("accessToken");
      const token = rawToken!.split(" ")[1];
      dispatch(connect(`${MY_ORDERS_URL}?token=${token}`));
    }

    return () => {
      if (match) {
        dispatch(disconnect());
      }
    };
  }, []);

  const showOrderInfo = useCallback((number: number) => {
    history.push({
      pathname: `${url}/${number}`,
      state: { modal: true },
    });
  }, []);

  if (!orders) {
    return (
      <div className={styles.feed}>
        <p className="text_type_main-default">Загрузка...</p>
      </div>
    );
  }

  if (
    orders.orders === null ||
    orders.orders === undefined ||
    orders.orders.length === 0
  ) {
    return (
      <div className={styles.feed}>
        <p className="text_type_main-default">Заказов пока нет</p>
      </div>
    );
  }

  const checkOrder = (order: TOrderInfo): boolean => {
    return (
      order !== undefined &&
      order != null &&
      Object.keys(order).length > 0 &&
      order.ingredients !== null &&
      order.ingredients !== undefined &&
      order.ingredients.length > 0
    );
  };

  return (
    <div className={styles.feed}>
      <ul className={`${styles.list} custom-scroll`}>
        {orders.orders.map((order) =>
          checkOrder(order) ? (
            <li key={order.number}>
              <OrderCard
                order={order}
                my={match !== null}
                showInfo={showOrderInfo}
              />
            </li>
          ) : (
            ""
          )
        )}
      </ul>
    </div>
  );
};

export default Orders;
