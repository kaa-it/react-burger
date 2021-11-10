import styles from "./order-feed.module.css";
import Orders from "../../components/orders/orders";
import OrderSummary from "../../components/orders-summary/order-summary";

const OrderFeedPage: React.FC = () => {
  return (
    <div className={styles.order_feed}>
      <div className={styles.orders}>
        <p className={styles.title}>Лента заказов</p>
        <Orders />
      </div>
      <div className={styles.summary}>
        <OrderSummary />
      </div>
    </div>
  );
};

export default OrderFeedPage;
