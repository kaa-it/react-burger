import styles from "./profile.module.css";
import { NavLink, Navigate, Routes, Route } from "react-router-dom";
import Profile from "../../components/profile/profile";
import ProtectedRoute from "../../components/protected-route/protected-route";
import { logout } from "../../services/authSlice";
import Orders from "../../components/orders/orders";
import { useAppDispatch, useAppSelector } from "../../services";
import React from "react";

const ProfilePage = () => {
  const dispatch = useAppDispatch();

  const { isLoggedOut } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoggedOut) {
    return <Navigate to="/login" replace/>;
  }

  return (
    <div className={styles.profile}>
      <div className={styles.left}>
        <ul className={styles.menu}>
          <NavLink
            to=""
            end
            className={({ isActive }) => styles.menu_item + (isActive ? ` ${styles.active_menu_item}` : "")}
           >
            <span>Профиль</span>
          </NavLink>
          <NavLink
            to="orders"
            end
            className={({ isActive }) => styles.menu_item + (isActive ? ` ${styles.active_menu_item}` : "")}
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
        <Routes>
          <Route path="" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }/>
          <Route path="orders" element={
            <ProtectedRoute>
              <div style={{ width: "100%", height: "100%", paddingTop: "20px" }}>
                <Orders />
              </div>
            </ProtectedRoute>
          }/>
        </Routes>
      </div>
    </div>
  );
};

export default ProfilePage;
