import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/register" element={<RegistrationPage />}/>
              <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
              <Route path="/reset-password" element={<ResetPasswordPage/>}/>
              <Route path="/profile/orders/:id" element={
                <ProtectedRoute>
                  <OrderInfo/>
                </ProtectedRoute>
              }/>
              <Route path="/profile/*" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }/>
              <Route path="/feed" element={<OrderFeedPage />}/>
              <Route path="/feed/:id" element={<OrderInfo/>}/>
              <Route path="/ingredients/:id" element={<IngredientDetails />}/>
              <Route element={<NotFound404/>}/>
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
};

export default App;
