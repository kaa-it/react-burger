import React, { useEffect, useState, useReducer } from "react";
import styles from "./app.module.css";

import {
  BunContext,
  ConstructorIngredientsContext,
  TotalPriceContext,
} from "../../services/constructorContext";

import { BurgerContext } from "../../services/burgerContext";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { baseUrl } from "../../utils/constants";

const totalPriceInitialState = { totalPrice: 0 };

const totalPriceReducer = (state: any, action: any) => {
  switch (action.type) {
    case "add":
      return { totalPrice: state.totalPrice + action.payload };
    case "remove":
      return { totalPrice: state.totalPrice - action.payload };
    default:
      throw new Error(`Wrong type of totalPrice action: ${action.type}`);
  }
};

function App() {
  const [bun, setBun] = useState(null);
  const [constructorIngredients, setConstructorIngredients] = useState([]);
  const [totalPriceState, totalPriceDispatcher] = useReducer(
    totalPriceReducer,
    totalPriceInitialState
  );
  const [ingredients, setIngredients] = useState([]);

  const [requestState, setRequestState] = useState({
    isLoading: false,
    hasError: false,
  });

  useEffect(() => {
    const getIngredients = async (url: string) => {
      try {
        const res = await fetch(url);
        const json = await res.json();

        setIngredients(json.data);
        setRequestState({ hasError: false, isLoading: false });
      } catch (err) {
        setRequestState({ hasError: true, isLoading: false });
      }
    };

    setRequestState({ hasError: false, isLoading: true });

    getIngredients(`${baseUrl}/ingredients`);
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        {requestState.isLoading && (
          <p className="text text_type_main-medium">Загрузка...</p>
        )}
        {requestState.hasError && (
          <p className="text text_type_main-medium">
            Не удалось загрузить данные
          </p>
        )}
        {!requestState.isLoading &&
          !requestState.hasError &&
          ingredients.length && (
            <>
              <BurgerContext.Provider value={{ ingredients, setIngredients }}>
                <BunContext.Provider value={{ bun, setBun }}>
                  <ConstructorIngredientsContext.Provider
                    value={{
                      constructorIngredients,
                      setConstructorIngredients,
                    }}
                  >
                    <TotalPriceContext.Provider
                      value={{ totalPriceState, totalPriceDispatcher }}
                    >
                      <BurgerIngredients />
                      <BurgerConstructor />
                    </TotalPriceContext.Provider>
                  </ConstructorIngredientsContext.Provider>
                </BunContext.Provider>
              </BurgerContext.Provider>
            </>
          )}
      </main>
    </div>
  );
}

export default App;
