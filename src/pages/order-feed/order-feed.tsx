import React from "react";
import styles from "./order-feed.module.css";
import OrderCard from "../../components/order-card/order-card";

const OrderFeedPage: React.FC = () => {
  return (
    <div className={styles.order_feed}>
      <OrderCard />
    </div>
  );
};

export default OrderFeedPage;
