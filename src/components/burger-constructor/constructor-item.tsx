import styles from "./burger-constructor.module.css";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../utils/types";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface IConstructorItem {
  item: TIngredient;
  type?: "top" | "bottom";
  onRemove?: (item: TIngredient) => void;
  index?: number;
  moveItem?: (fromIndex: number, toIndex: number) => void;
}

const ConstructorItem: React.FC<IConstructorItem> = ({
  item,
  type,
  index,
  onRemove,
  moveItem,
}) => {
  const isLocked = type !== undefined;

  let suffix = "";
  if (type === "top") {
    suffix = " (верх)";
  } else if (type === "bottom") {
    suffix = " (низ)";
  }

  const text = item.name + suffix;

  const onClose = () => {
    if (onRemove) {
      onRemove(item);
    }
  };

  const ref = useRef<HTMLDivElement>(null);

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
    canDrop: (_item: TIngredient) => {
      return type === undefined;
    },
    hover: (item: TIngredient, monitor) => {
      if (!ref.current) {
        return;
      }

      if (item.index === undefined) {
        return;
      }

      if (!moveItem) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index!; // ref for buns not assigned

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current!.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset()!;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  if (type == undefined) {
    drag(drop(ref));
  }

  return (
    <div
      className={styles.constructor_item}
      {...(type == undefined && {
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
        price={item.price}
        thumbnail={item.image}
        handleClose={!isLocked ? onClose : undefined}
      />
    </div>
  );
};

export default ConstructorItem;
