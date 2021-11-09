import React from "react";
import styles from "./order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/currency-icon";
import { useAppSelector } from "../../services";
import IngredientsIllustrations from "./ingredients-illustrations/ingredients-illustrations";

const OrderCard: React.FC = () => {
  const { ingredients } = useAppSelector((state) => state.ingredients);

  const images = ingredients.map((item) => item.image_mobile);

  return (
    <div className={styles.card}>
      <div className={styles.id_info}>
        <span className="text_type_digits-default">#034535</span>
        <span className="text_type_main-default text_color_inactive">
          Сегодня, 16:20 i-GMT+3
        </span>
      </div>
      <span className="text_type_main-medium">
        Death Star Starship Main бургер
      </span>
      <div className={styles.composition_and_price}>
        <IngredientsIllustrations images={images} />
        <p className={styles.price}>
          {480}
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
