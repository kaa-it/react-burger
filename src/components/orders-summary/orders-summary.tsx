import React from "react";
import styles from "./order-summary.module.css";

const nums = [
  "034533",
  "034533",
  "034533",
  "034533",
  "034533",
  "034533",
  "034533",
  "034533",
  "034533",
  "034533",
  "034533",
  "034533",
  "034533",
  "034533",
  "034533",
  "034533",
  "034533",
  "034533",
  "034533",
  "034533",
  "034533",
  "034533",
];

//const nums: string[] = [];

const OrdersSummary: React.FC = () => {
  const cols = Math.floor(nums.length / 10) + 1;
  const array = Array.from(Array(cols).keys());
  const chunks = nums.reduce((all: string[][], one, i) => {
    const ch = Math.floor(i / 10);
    const s: string[] = [];
    all[ch] = s.concat(all[ch] || [], one);
    return all;
  }, []);
  return (
    <div className={styles.orders_summary}>
      <div className={styles.statuses}>
        <div className={styles.status}>
          <span className="text_type_main-medium pb-6">Готовы:</span>
          <div className={styles.columns_success}>
            {nums.length > 0 &&
              array.map((i) => (
                <div className={styles.column}>
                  {chunks[i].map((v) => (
                    <span className="text_type_digits-default">{v}</span>
                  ))}
                </div>
              ))}
          </div>
        </div>
        <div className={styles.status}>
          <span className="text_type_main-medium pb-6">В работе:</span>
          <div className={styles.columns}>
            {nums.length > 0 &&
              array.map((i) => (
                <div className={styles.column}>
                  {chunks[i].map((v) => (
                    <span className="text_type_digits-default">{v}</span>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className={styles.count}>
        <span className="text_type_main-medium">Выполнено за все время:</span>
        <span className="text_type_digits-large">28752</span>
      </div>
      <div className={styles.count}>
        <span className="text_type_main-medium">Выполнено за сегодня:</span>
        <span className="text_type_digits-large">138</span>
      </div>
    </div>
  );
};

export default OrdersSummary;
