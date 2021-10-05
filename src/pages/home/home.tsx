import React, { useEffect } from "react";
import styles from "./home.module.css";

import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/ingredientsSlice";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const HomePage = () => {
  const { ingredients, isLoading, hasError } = useSelector(
    (state: any) => state.ingredients
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <div className={styles.home}>
      {isLoading && <p className="text text_type_main-medium">Загрузка...</p>}
      {hasError && (
        <p className="text text_type_main-medium">
          Не удалось загрузить данные
        </p>
      )}
      {!isLoading && !hasError && ingredients.length && (
        <>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </>
      )}
    </div>
  );
};

export default HomePage;
