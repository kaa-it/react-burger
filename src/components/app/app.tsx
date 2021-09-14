import React, { useEffect, useState } from "react";
import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const baseUrl = "https://norma.nomoreparties.space/api";

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    ingredients: [],
  });

  useEffect(() => {
    const getData = async (url: string) => {
      try {
        const res = await fetch(url);
        const json = await res.json();

        setState({ ingredients: json.data, hasError: false, isLoading: false });
      } catch (err) {
        setState({ ...state, hasError: true, isLoading: false });
      }
    };

    setState({ ...state, hasError: false, isLoading: true });

    getData(`${baseUrl}/ingredients`);
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {state.isLoading && (
          <p className="text text_type_main-medium">Загрузка...</p>
        )}
        {state.hasError && (
          <p className="text text_type_main-medium">
            Не удалось загрузить данные
          </p>
        )}
        {!state.isLoading && !state.hasError && state.ingredients.length && (
          <>
            <BurgerIngredients ingredients={state.ingredients} />
            <BurgerConstructor ingredients={state.ingredients} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
