import React from "react";
import styles from "./order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import { useAppSelector } from "../../services";
import IngredientsIllustrations from "./ingredients-illustrations/ingredients-illustrations";
import { TOrderInfo } from "../../utils/types";
import { convertDate, statusInfo } from "../../utils/utils";

interface IOrderCard {
  order: TOrderInfo;
  my: boolean;
  showInfo: (item: number) => void;
}

const OrderCard: React.FC<IOrderCard> = ({ order, my, showInfo }) => {
  const { ingredientsMap } = useAppSelector((state) => state.ingredients);

  const images = order.ingredients.map((id) => {
    const ingredient = ingredientsMap.get(id);
    return ingredient ? ingredient.image_mobile : "";
  });

  if (images.includes("")) {
    return null;
  }

  const price = order.ingredients
    .map((id) => ingredientsMap.get(id)!.price)
    .reduce((a, b) => a + b);

  const statusClassName =
    order.status === "done" ? styles.status_success : styles.status;

  return (
    <div className={styles.card} onClick={() => showInfo(order.number)}>
      <div className={styles.id_info}>
        <span className="text_type_digits-default">{`#${order.number}`}</span>
        <span className="text_type_main-default text_color_inactive">
          {convertDate(order.createdAt)}
        </span>
      </div>
      <span className={styles.name}>{order.name}</span>
      {my && <p className={statusClassName}>{statusInfo(order.status)}</p>}
      <div className={styles.composition_and_price}>
        <IngredientsIllustrations images={images} />
        <p className={styles.price}>
          {price}
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
