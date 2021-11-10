import React, { useCallback } from "react";
import styles from "./orders.module.css";
import OrderCard from "../order-card/order-card";
import { useHistory, useRouteMatch } from "react-router-dom";

const Orders: React.FC = () => {
  const history = useHistory();

  const { url } = useRouteMatch();

  const showOrderInfo = useCallback((item: any) => {
    history.push({
      pathname: `${url}/1`,
      state: { modal: true },
    });
  }, []);

  return (
    <div className={styles.feed}>
      <ul className={`${styles.list} custom-scroll`}>
        <li>
          <OrderCard showInfo={showOrderInfo} />
        </li>
        <li>
          <OrderCard showInfo={showOrderInfo} />
        </li>
        <li>
          <OrderCard showInfo={showOrderInfo} />
        </li>
        <li>
          <OrderCard showInfo={showOrderInfo} />
        </li>
        <li>
          <OrderCard showInfo={showOrderInfo} />
        </li>
        <li>
          <OrderCard showInfo={showOrderInfo} />
        </li>
      </ul>
    </div>
  );
};

export default Orders;
