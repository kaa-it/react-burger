import styles from "./burger-constructor.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropTypes } from "../../utils/types";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const ConstructorItem = ({ item, type, index, onRemove, moveItem }: any) => {
  const isLocked = type !== undefined || !item;
  let suffix = "";

  if (item) {
    if (type === "top") {
      suffix = " (верх)";
    } else if (type === "bottom") {
      suffix = " (низ)";
    }
  }

  const text = item
    ? item.name + suffix
    : type === "top" || type === "bottom"
    ? "Выберите булки"
    : "Выберите начинку";

  const onClose = () => {
    if (onRemove) {
      onRemove(item);
    }
  };

  const ref = useRef(null);

  const [{ opacity }, drag] = useDrag({
    type: item.type,
    item: { ...item, index: index ? index : -1 },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: ["sauce", "main"],
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    canDrop: (item, monitor) => {
      return type === undefined;
    },
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      // @ts-ignore
      if (item.index === undefined) {
        return;
      }

      if (!moveItem) {
        return;
      }

      // @ts-ignore
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      // @ts-ignore
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      // @ts-ignore
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);

      // @ts-ignore
      item.index = hoverIndex;
    },
  });

  if (type !== "bun") {
    drag(drop(ref));
  }

  return (
    <div
      className={styles.constructor_item}
      {...(type !== "bun" && {
        ref: ref,
        style: { opacity: opacity },
        "data-handler-id": handlerId,
      })}
    >
      <div style={{ visibility: isLocked ? "hidden" : "visible" }}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={text}
        thumbnail={""}
        {...(item && {
          price: item.price,
          thumbnail: item.image,
          handleClose: onClose,
        })}
      />
    </div>
  );
};

ConstructorItem.propTypes = {
  item: ingredientPropTypes.isRequired,
  type: PropTypes.string,
  onRemove: PropTypes.func,
  index: PropTypes.number,
  moveItem: PropTypes.func,
};

export default ConstructorItem;
