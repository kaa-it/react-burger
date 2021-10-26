import styles from "./placeholder-item.module.css";

interface IPlaceholderItemProps {
  type?: "top" | "bottom";
  highlighted: boolean;
}

const PlaceholderItem: React.FC<IPlaceholderItemProps> = ({
  type,
  highlighted,
}) => {
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

export default PlaceholderItem;
