import React, { useState } from "react";
import styles from "./forgot-password.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  return (
    <div className={styles.forgot_password}>
      <span className="text_type_main-medium">Восстановление пароля</span>
      <EmailInput
        onChange={handleEmailChange}
        value={email}
        name="Укажите e-mail"
      />
      <Button type="primary">Восстановить</Button>
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

export default ForgotPasswordPage;
