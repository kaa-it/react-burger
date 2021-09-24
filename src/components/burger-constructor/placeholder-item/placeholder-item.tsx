import PropTypes from "prop-types";
import styles from "./placeholder-item.module.css";

const PlaceholderItem = ({ type }: any) => {
  const typeClass =
    type === "top"
      ? "constructor-element constructor-element_pos_top"
      : type === "bottom"
      ? "constructor-element constructor-element_pos_bottom"
      : "constructor-element";

  const text =
    type === "top" || type === "bottom" ? "Выберите булки" : "Выберите начинку";

  return (
    <div className={`${styles.placeholder_item} ${typeClass}`}>
      <span className={styles.text}>{text}</span>
    </div>
  );
};

PlaceholderItem.propTypes = {
  type: PropTypes.string,
};

export default PlaceholderItem;
