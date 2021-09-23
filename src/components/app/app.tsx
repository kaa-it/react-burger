import React, { useEffect, useState, useReducer } from "react";
import styles from "./app.module.css";

import {
  BunContext,
  ConstructorIngredientsContext,
  TotalPriceContext,
} from "../../services/constructorContext";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/ingredientsSlice";

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

  const { ingredients, isLoading, hasError } = useSelector(
    (state: any) => state.ingredients
  );
  const dispatch = useDispatch();

  // const [requestState, setRequestState] = useState({
  //   isLoading: false,
  //   hasError: false,
  // });

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
          </>
        )}
      </main>
    </div>
  );
}

export default App;
