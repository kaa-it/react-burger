import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import {
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  NotFound404,
  OrderFeedPage,
  ProfilePage,
  RegistrationPage,
  ResetPasswordPage,
} from "../../pages";
import ProtectedRoute from "../protected-route/protected-route";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details";
import { fetchIngredients } from "../../services/ingredientsSlice";
import { useAppDispatch, useAppSelector } from "../../services";
import OrderInfo from "../order-info/order-info";

const App: React.FC = () => {
  const { ingredients, isLoading, hasError } = useAppSelector(
    (state) => state.ingredients
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <Router>
      <div className={styles.app}>
        <AppHeader />
        <main className={styles.main}>
          {isLoading && (
            <p className="text text_type_main-medium">Загрузка...</p>
          )}
          {hasError && (
            <p className="text text_type_main-medium">
              Не удалось загрузить данные
            </p>
          )}
          {!isLoading && !hasError && ingredients.length && (
            <Switch>
              <Route path="/" exact={true}>
                <HomePage />
              </Route>
              <Route path="/login" exact={true}>
                <LoginPage />
              </Route>
              <Route path="/register" exact={true}>
                <RegistrationPage />
              </Route>
              <Route path="/forgot-password" exact={true}>
                <ForgotPasswordPage />
              </Route>
              <Route path="/reset-password" exact={true}>
                <ResetPasswordPage />
              </Route>
              <ProtectedRoute path="/profile/orders/:id" exact={true}>
                <OrderInfo />
              </ProtectedRoute>
              <ProtectedRoute path="/profile">
                <ProfilePage />
              </ProtectedRoute>
              <Route path="/feed" exact={true}>
                <OrderFeedPage />
              </Route>
              <Route path="/feed/:id" exact={true}>
                <OrderInfo />
              </Route>
              <Route path="/ingredients/:id" exact={true}>
                <IngredientDetails />
              </Route>
              <Route>
                <NotFound404 />
              </Route>
            </Switch>
          )}
        </main>
      </div>
    </Router>
  );
};

export default App;
