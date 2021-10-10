import React from "react";
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

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <AppHeader />
        <main className={styles.main}>
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
            <ProtectedRoute path="/profile" exact={true}>
              <ProfilePage />
            </ProtectedRoute>
            <ProtectedRoute path="/order-feed" exact={true}>
              <OrderFeedPage />
            </ProtectedRoute>
            <Route>
              <NotFound404 />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
