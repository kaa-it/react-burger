import React from "react";
import styles from "./ingredient-details.module.css";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Modal from "../../modal/modal";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const { state = {} } = useLocation();
  // @ts-ignore
  const { modal } = state;

  const history = useHistory();

  // @ts-ignore
  const { id } = useParams();

  // @ts-ignore
  const { ingredients } = useSelector((state) => state.ingredients);

  // @ts-ignore
  const ingredient = ingredients.find((el: any) => el._id === id);

  const content = (
    <div className={styles.ingredient_details}>
      {(!modal || history.action !== "PUSH") && (
        <p className="text_type_main-large mt-30">Детали ингредиента</p>
      )}
      <img
        alt="Нет фото"
        src={ingredient.image}
        className={`${styles.illustration} mb-4`}
      />
      <p className="text_type_main-medium mb-8">{ingredient.name}</p>
      <div className={styles.data}>
        <div className={styles.data_item}>
          <p className="text text_type_main-default mb-2">Калории,ккал</p>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </div>
        <div className={styles.data_item}>
          <p className="text text_type_main-default mb-2">Белки, г</p>
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </div>
        <div className={styles.data_item}>
          <p className="text text_type_main-default mb-2">Жиры, г</p>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </div>
        <div className={styles.data_item}>
          <p className="text text_type_main-default mb-2">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {modal && history.action === "PUSH" ? (
        <Modal onClose={() => history.goBack()} title="Детали ингредиента">
          {content}
        </Modal>
      ) : (
        content
      )}
    </>
  );
};

export default IngredientDetails;
