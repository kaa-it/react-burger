import React from "react";
import styles from "./orders.module.css";
import OrderCard from "../order-card/order-card";

const Orders: React.FC = () => {
  return (
    <div className={styles.feed}>
      <ul className={`${styles.list} custom-scroll`}>
        <li>
          <OrderCard />
        </li>
        <li>
          <OrderCard />
        </li>
        <li>
          <OrderCard />
        </li>
        <li>
          <OrderCard />
        </li>
        <li>
          <OrderCard />
        </li>
        <li>
          <OrderCard />
        </li>
      </ul>
    </div>
  );
};

export default Orders;
