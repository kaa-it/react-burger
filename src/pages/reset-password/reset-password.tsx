import React, { useState } from "react";
import styles from "./reset-password.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const handleCodeChange = (e: any) => {
    setCode(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.reset_password}>
      <span className="text_type_main-medium">Восстановление пароля</span>
      <PasswordInput
        onChange={handlePasswordChange}
        value={password}
        name="Введите новый пароль"
      />
      <Input
        type="text"
        onChange={handleCodeChange}
        value={code}
        placeholder="Введите код из письма"
      />

      <Button type="primary">Сохранить</Button>
      <div className={`${styles.line} mt-9`}>
        <span className="text_type_main-default text_color_inactive mr-2">
          Вспомнили пароль?
        </span>
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
