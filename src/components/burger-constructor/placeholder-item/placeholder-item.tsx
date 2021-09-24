import PropTypes from "prop-types";
import styles from "./placeholder-item.module.css";

const PlaceholderItem = ({ type }: any) => {
  let className = `${styles.placeholder_item}`;

  if (type === "top") {
    className += ` ${styles.placeholder_item_top}`;
  } else if (type === "bottom") {
    className += ` ${styles.placeholder_item_bottom}`;
  }

  const text =
    type === "top" || type === "bottom" ? "Выберите булки" : "Выберите начинку";

  return (
    <div className={className}>
      <span>{text}</span>
    </div>
  );
};

PlaceholderItem.propTypes = {
  type: PropTypes.string,
};

export default PlaceholderItem;
