import React, { useEffect } from "react";
import styles from "./order-feed.module.css";
import Orders from "../../components/orders/orders";
import OrdersSummary from "../../components/orders-summary/orders-summary";
import { useAppDispatch } from "../../services";
import { connect, disconnect } from "../../services/orders/actions";

const ALL_ORDERS_URL = "wss:/norma.nomoreparties.space/orders/all";

const OrderFeedPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(connect(ALL_ORDERS_URL));
    return () => {
      dispatch(disconnect());
    };
  }, []);

  return (
    <div className={styles.order_feed}>
      <div className={styles.orders}>
        <p className={styles.title}>Лента заказов</p>
        <Orders />
      </div>
      <div className={styles.summary}>
        <OrdersSummary />
      </div>
    </div>
  );
};

export default OrderFeedPage;
