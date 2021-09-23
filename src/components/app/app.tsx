import React, { useEffect } from "react";
import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/ingredientsSlice";

function App() {
  const { ingredients, isLoading, hasError } = useSelector(
    (state: any) => state.ingredients
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {isLoading && <p className="text text_type_main-medium">Загрузка...</p>}
        {hasError && (
          <p className="text text_type_main-medium">
            Не удалось загрузить данные
          </p>
        )}
        {!isLoading && !hasError && ingredients.length && (
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
