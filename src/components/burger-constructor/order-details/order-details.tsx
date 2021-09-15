import React from "react";
import styles from "./order-details.module.css";
import done from "../../../images/done.png";

const OrderDetails = () => {
  const blockClickBubble = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.order_details} onClick={blockClickBubble}>
      <p
        className="text text_type_digits-large mb-8"
        style={{ textShadow: "0px 4px 32px #3333FF" }}
      >
        034536
      </p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img className={styles.image} alt="Принят" src={done} />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
