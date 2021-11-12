import React, { useCallback } from "react";
import styles from "./orders.module.css";
import OrderCard from "../order-card/order-card";
import { useHistory, useRouteMatch } from "react-router-dom";
import { TOrderInfo } from "../../utils/types";

interface IOrdersProps {
  orders?: Array<TOrderInfo>;
}

const Orders: React.FC<IOrdersProps> = ({ orders }) => {
  const history = useHistory();

  const { url } = useRouteMatch();

  const showOrderInfo = useCallback((number: number) => {
    history.push({
      pathname: `${url}/${number}`,
      state: { modal: true },
    });
  }, []);

  if (!orders) {
    return null;
  }

  return (
    <div className={styles.feed}>
      <ul className={`${styles.list} custom-scroll`}>
        {orders.map((order) => (
          <li>
            <OrderCard
              key={order.number}
              order={order}
              showInfo={showOrderInfo}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
