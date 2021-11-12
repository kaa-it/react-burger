import React from "react";
import styles from "./order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import { useAppSelector } from "../../services";
import IngredientsIllustrations from "./ingredients-illustrations/ingredients-illustrations";
import { TOrderInfo } from "../../utils/types";

interface IOrderCard {
  order: TOrderInfo;
  showInfo: (item: any) => void;
}

const OrderCard: React.FC<IOrderCard> = ({ order, showInfo }) => {
  const { ingredientsMap } = useAppSelector((state) => state.ingredients);

  const images = order.ingredients.map(
    (id) => ingredientsMap.get(id)!.image_mobile
  );
  const price = order.ingredients
    .map((id) => ingredientsMap.get(id)!.price)
    .reduce((a, b) => a + b);

  return (
    <div className={styles.card} onClick={() => showInfo(order.number)}>
      <div className={styles.id_info}>
        <span className="text_type_digits-default">{`#${order.number}`}</span>
        <span className="text_type_main-default text_color_inactive">
          {order.createdAt}
        </span>
      </div>
      <span className={styles.name}>{order.name}</span>
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
