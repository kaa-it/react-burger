import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css";
import styles from "./app-header.module.css";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/burger-icon";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/list-icon";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/profile-icon";
import { Link, NavLink } from "react-router-dom";

const AppHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_content}>
        <nav className={styles.left_menu}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => styles.menu_item + (isActive ? ` ${styles.active_menu_item}` : "")}
          >
            <BurgerIcon type="primary" />
            <p className="pl-2">Конструктор</p>
          </NavLink>
          <NavLink
            to="/feed"
            end
            className={({ isActive }) => styles.menu_item + (isActive ? ` ${styles.active_menu_item}` : "")}
          >
            <ListIcon type="secondary" />
            <p className="pl-2">Лента заказов</p>
          </NavLink>
        </nav>
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
        <nav className={styles.right_menu}>
          <NavLink
            to="/profile"
            className={({ isActive }) => styles.menu_item + (isActive ? ` ${styles.active_menu_item}` : "")}
          >
            <ProfileIcon type="secondary" />
            <p className="pl-2">Личный кабинет</p>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
