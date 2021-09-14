import React from "react";
import styles from "./order-details.module.css";
import PropTypes from "prop-types";
import done from "../../../images/done.png";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderDetails = ({ onClose }: any) => {
  const onClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.order_details} onClick={onClick}>
      <div className={styles.close_icon}>
        <CloseIcon onClick={onClose} type="primary" />
      </div>
      <p
        className="text text_type_digits-large mb-8"
        style={{ textShadow: "0px 4px 32px #3333FF" }}
      >
        034536
      </p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img className={styles.image} src={done} />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

OrderDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default OrderDetails;
