import React from 'react';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import styles from './app-header.module.css';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/burger-icon';
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/list-icon';
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/profile-icon';

const AppHeader = () => {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.header_content}>
                    <nav className={styles.left_menu}>
                        <a href="#" className={styles.menu_item + " pt-4 pb-4 pl-5 pr-5"}>
                            <BurgerIcon type="primary"/>
                            <p className="text text_type_main-default pl-2">
                                Конструктор
                            </p>
                        </a>
                        <a href="#" className={styles.menu_item + " pt-4 pb-4 pl-5 pr-5"}>
                            <ListIcon type="secondary"/>
                            <p className="text text_type_main-default text_color_inactive pl-2">
                                Лента заказов
                            </p>
                        </a>
                    </nav>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                    <nav className={styles.right_menu}>
                    <a href="#" className={styles.menu_item + " pt-4 pb-4 pl-5 pr-5"}>
                        <ProfileIcon type="secondary"/>
                        <p className="text text_type_main-default text_color_inactive pl-2">
                            Личный кабинет
                        </p>
                    </a>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default AppHeader;

