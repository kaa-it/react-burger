import React from "react";
import { Link } from "react-router-dom";
import styles from "./not-found.module.css";
import not_found from "../../images/404.png";

const NotFound404: React.FC = () => {
  return (
    <div className={styles.not_found}>
      <img alt="404 Not Found" src={not_found} height="300px" />
      <span className="text_type_main-default">Страница не найдена</span>
      <Link className={styles.link} to="/">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound404;
