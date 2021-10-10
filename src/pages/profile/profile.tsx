import React from "react";
import styles from "./profile.module.css";
import { NavLink, Switch, useRouteMatch } from "react-router-dom";
import Profile from "../../components/profile/profile";
import ProtectedRoute from "../../components/protected-route/protected-route";

const ProfilePage = () => {
  const { url } = useRouteMatch();

  const handleLogout = () => {};

  return (
    <div className={styles.profile}>
      <div className={styles.left}>
        <ul className={styles.menu}>
          <NavLink
            to={url}
            className={styles.menu_item}
            activeClassName={styles.active_menu_item}
          >
            <span>Профиль</span>
          </NavLink>
          <NavLink
            to={`${url}/orders`}
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
        </Switch>
      </div>
    </div>
  );
};

export default ProfilePage;
