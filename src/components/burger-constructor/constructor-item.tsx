import styles from "./burger-constructor.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropTypes } from "../../utils/types";
import PropTypes from "prop-types";
import React from "react";

const ConstructorItem = ({ item, type, onRemove }: any) => {
  const isLocked = type !== undefined;
  let suffix = "";

  if (type === "top") {
    suffix = " (верх)";
  } else if (type === "bottom") {
    suffix = " (низ)";
  }

  const onClose = () => {
    if (onRemove) {
      onRemove(item);
    }
  };

  return (
    <div className={styles.constructor_item}>
      <div style={{ visibility: isLocked ? "hidden" : "visible" }}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={item.name + suffix}
        price={item.price}
        thumbnail={item.image}
        handleClose={onClose}
      />
    </div>
  );
};

ConstructorItem.propTypes = {
  item: ingredientPropTypes.isRequired,
  type: PropTypes.string,
  onRemove: PropTypes.func,
};

export default ConstructorItem;