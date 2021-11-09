import React from "react";
import styles from "./ingredients-illustrations.module.css";

interface IIngredientsIllustrationsProps {
  images: Array<string>;
}

const IngredientsIllustrations: React.FC<IIngredientsIllustrationsProps> = (
  props
) => {
  const images = props.images.reverse();

  const num = images.length > 5 ? 6 : images.length;

  return (
    <div className={styles.illustrations}>
      {images.slice(0, num).map((image, i) => (
        <div
          className={styles.illustration}
          style={{ left: `${-20 + 45 * (num - i - 1)}px` }}
          key={i}
        >
          <div className={styles.border} />
          <img alt="Нет фото" src={image} className={styles.image} />
          {i === 0 && images.length > 6 && (
            <div className={`${styles.number} text_type_main-default`}>{`+${
              images.length - 6
            }`}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default IngredientsIllustrations;
