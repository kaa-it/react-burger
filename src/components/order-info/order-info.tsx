import React from "react";
import styles from "./order-info.module.css";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { IIDParams, IModalLocationState } from "../../utils/types";
import Modal from "../modal/modal";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import Ingredients from "../ingredients/ingredients";

const OrderInfo: React.FC = () => {
  const location = useLocation<IModalLocationState>();

  const { modal } = location.state ? location.state : { modal: undefined };

  const history = useHistory();

  const { id } = useParams<IIDParams>();

  const content = (
    <div className={styles.order_info}>
      <p className={styles.title}>Black Hole Singularity острый бургер</p>
      <p className={styles.status}>Выполнен</p>
      <p className={styles.ingredients_title}>Состав:</p>
      <div className={styles.ingredients}>
        <Ingredients />
      </div>
      <div className={styles.footer}>
        <span className="text_type_main-default text_color_inactive">
          Сегодня, 16:20 i-GMT+3
        </span>
        <p className={styles.price}>
          {480}
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );

  return (
    <>
      {modal && history.action === "PUSH" ? (
        <Modal onClose={() => history.goBack()} title="#034533">
          <div className={styles.order_info}>{content}</div>
        </Modal>
      ) : (
        <div className={styles.order_info}>
          <div className={styles.container}>
            <p className={styles.number}>#034533</p>
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderInfo;
