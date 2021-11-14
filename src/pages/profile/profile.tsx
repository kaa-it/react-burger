import styles from "./profile.module.css";
import { NavLink, Redirect, Switch, useRouteMatch } from "react-router-dom";
import Profile from "../../components/profile/profile";
import ProtectedRoute from "../../components/protected-route/protected-route";
import { logout } from "../../services/authSlice";
import Orders from "../../components/orders/orders";
import { useAppDispatch, useAppSelector } from "../../services";
import React from "react";

const ProfilePage = () => {
  const { url } = useRouteMatch();

  const dispatch = useAppDispatch();

  const { isLoggedOut } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoggedOut) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={styles.profile}>
      <div className={styles.left}>
        <ul className={styles.menu}>
          <NavLink
            to={url}
            exact
            className={styles.menu_item}
            activeClassName={styles.active_menu_item}
          >
            <span>Профиль</span>
          </NavLink>
          <NavLink
            to={`${url}/orders`}
            exact
            className={styles.menu_item}
            activeClassName={styles.active_menu_item}
          >
            <span>История заказов</span>
          </NavLink>
          <div
            className={styles.menu_item}
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            <span>Выход</span>
          </div>
        </ul>
        <p className="text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={styles.right}>
        <Switch>
          <ProtectedRoute path={url} exact={true}>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path={`${url}/orders`} exact={true}>
            <div style={{ width: "100%", height: "100%", paddingTop: "20px" }}>
              <Orders />
            </div>
          </ProtectedRoute>
        </Switch>
      </div>
    </div>
  );
};

export default ProfilePage;
