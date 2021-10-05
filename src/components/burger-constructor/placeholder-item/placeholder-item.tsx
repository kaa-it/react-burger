import PropTypes from "prop-types";
import styles from "./placeholder-item.module.css";

const PlaceholderItem = ({ type, highlighted }: any) => {
  let className = `${styles.placeholder_item}`;

  if (type === "top") {
    className += ` ${styles.placeholder_item_top}`;
  } else if (type === "bottom") {
    className += ` ${styles.placeholder_item_bottom}`;
  }

  if (highlighted) {
    className += ` ${styles.placeholder_item_highlighted}`;
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
  highlighted: PropTypes.bool,
};

export default PlaceholderItem;
