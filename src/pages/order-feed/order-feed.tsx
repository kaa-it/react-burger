import React from "react";
import styles from "./order-feed.module.css";
import OrderCard from "../../components/order-card/order-card";
import Orders from "../../components/orders/orders";

const OrderFeedPage: React.FC = () => {
  return (
    <div className={styles.order_feed}>
      <Orders />
    </div>
  );
};

export default OrderFeedPage;
