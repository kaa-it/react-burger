import React from "react";
import styles from "./order-summary.module.css";
import { TOrders } from "../../utils/types";

interface IOrderStatusWallProps {
  numbers: Array<number>;
  isDone: boolean;
}

const OrderStatusWall: React.FC<IOrderStatusWallProps> = ({
  numbers,
  isDone,
}) => {
  const cols = Math.floor(numbers.length / 10) + 1;
  const array = Array.from(Array(cols).keys());
  const chunks = numbers.reduce((all: string[][], one, i) => {
    const ch = Math.floor(i / 10);
    const s: string[] = [];
    all[ch] = s.concat(all[ch] || [], `${one}`);
    return all;
  }, []);

  return (
    <div className={styles.status}>
      <span className="text_type_main-medium pb-6">
        {isDone ? "Готовы:" : "В работе:"}
      </span>
      <div className={isDone ? styles.columns_success : styles.columns}>
        {numbers.length > 0 &&
          array.map((i) => (
            <div key={i} className={styles.column}>
              {chunks[i]?.map((v) => (
                <span key={v} className="text_type_digits-default">
                  {v}
                </span>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

interface IOrdersSummaryProps {
  orders: TOrders;
}

const OrdersSummary: React.FC<IOrdersSummaryProps> = ({ orders }) => {
  const doneOrders = orders.orders
    .filter((order) => order.status === "done")
    .map((order) => order.number);
  const otherOrders = orders.orders
    .filter((order) => order.status !== "done")
    .map((order) => order.number);

  return (
    <div className={styles.orders_summary}>
      <div className={styles.statuses}>
        <OrderStatusWall numbers={doneOrders} isDone={true} />
        <OrderStatusWall numbers={otherOrders} isDone={false} />
      </div>
      <div className={styles.count}>
        <span className="text_type_main-medium">Выполнено за все время:</span>
        <span className="text_type_digits-large">{orders.total}</span>
      </div>
      <div className={styles.count}>
        <span className="text_type_main-medium">Выполнено за сегодня:</span>
        <span className="text_type_digits-large">{orders.totalToday}</span>
      </div>
    </div>
  );
};

export default OrdersSummary;
