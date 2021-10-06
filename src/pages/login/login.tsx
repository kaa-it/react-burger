import React, { useState } from "react";
import styles from "./login.module.css";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.login}>
      <span className="text_type_main-medium">Вход</span>
      <EmailInput onChange={handleEmailChange} value={email} name="email" />
      <PasswordInput
        onChange={handlePasswordChange}
        value={password}
        name="Пароль"
      />
      <Button type="primary">Войти</Button>
      <div className={`${styles.line} mt-9`}>
        <span className="text_type_main-default text_color_inactive mr-2">
          Вы - новый пользователь?
        </span>
        <Link to="/" className={styles.link}>
          Зарегистрироваться
        </Link>
      </div>
      <div className={styles.line}>
        <span className="text_type_main-default text_color_inactive mr-2">
          Забыли пароль?
        </span>
        <Link to="/" className={styles.link}>
          Восстановить пароль
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
