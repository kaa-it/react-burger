import React, { useState } from "react";
import styles from "./registration.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.registration}>
      <span className="text_type_main-medium">Регистрация</span>
      <Input
        type="text"
        onChange={handleNameChange}
        value={name}
        placeholder={"Имя"}
      />
      <EmailInput onChange={handleEmailChange} value={email} name="email" />
      <PasswordInput
        onChange={handlePasswordChange}
        value={password}
        name="Пароль"
      />
      <Button type="primary">Зарегистрироваться</Button>
      <div className={`${styles.line} mt-9`}>
        <span className="text_type_main-default text_color_inactive mr-2">
          Уже зарегистрированы?
        </span>
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </div>
    </div>
  );
};

export default RegistrationPage;
