import React, { useEffect } from "react";
import styles from "./order-info.module.css";
import { useNavigate, useLocation, useParams, useNavigationType } from "react-router-dom";
import { IIDParams, IModalLocationState } from "../../utils/types";
import Modal from "../modal/modal";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import Ingredients from "../ingredients/ingredients";
import { useAppDispatch, useAppSelector } from "../../services";
import { getOrder } from "../../services/orders/reducer";
import { statusInfo } from "../../utils/utils";

const OrderInfo: React.FC = () => {
  const state = useLocation().state as IModalLocationState;

  const { modal } = state ? state : { modal: undefined };

  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const { id } = useParams<'id'>();

  const { orders } = useAppSelector((state) => state.orders);
  const { ingredientsMap } = useAppSelector((state) => state.ingredients);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!orders && id) {
      dispatch(getOrder(id));
    }
  }, [orders]);

  if (orders === null) {
    return (
      <div className={styles.order_info}>
        <p className="text_type_main-default">Загрузка...</p>
      </div>
    );
  }

  const order = orders.orders.find((order) => order.number.toString() === id)!;

  const price = order.ingredients
    .map((id) => ingredientsMap.get(id)!.price)
    .reduce((a, b) => a + b);

  const statusClassName =
    order.status === "done" ? styles.status_success : styles.status;

  const content = (
    <div className={styles.order_info}>
      <p className={styles.title}>{order.name}</p>
      <p className={statusClassName}>{statusInfo(order.status)}</p>
      <p className={styles.ingredients_title}>Состав:</p>
      <div className={styles.ingredients}>
        <Ingredients ingredients={order.ingredients} />
      </div>
      <div className={styles.footer}>
        <span className="text_type_main-default text_color_inactive">
          {order.createdAt}
        </span>
        <p className={styles.price}>
          {price}
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );

  return (
    <>
      {modal && navigationType === "PUSH" ? (
        <Modal onClose={() => navigate(-1)} title={`#${order.number}`}>
          <div className={styles.order_info}>{content}</div>
        </Modal>
      ) : (
        <div className={styles.order_info}>
          <div className={styles.container}>
            <p className={styles.number}>{`#${order.number}`}</p>
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderInfo;
