import React, { useCallback, useState } from "react";
import styles from "./registration.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../services/authSlice";

const RegistrationPage = () => {
  // @ts-ignore
  const { accessToken } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [form, setValue] = useState({ email: "", password: "", name: "" });

  const handleChange = (e: any) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(register(form));
    },
    [form]
  );

  if (accessToken) {
    return <Redirect to="/" />;
  }

  return (
    <form className={styles.registration}>
      <span className="text_type_main-medium">Регистрация</span>
      <Input
        type="text"
        onChange={handleChange}
        value={form.name}
        placeholder={"Имя"}
        name="name"
      />
      <EmailInput onChange={handleChange} value={form.email} name="email" />
      <PasswordInput
        onChange={handleChange}
        value={form.password}
        name="password"
      />
      <Button type="primary" onClick={handleRegister}>
        Зарегистрироваться
      </Button>
      <div className={`${styles.line} mt-9`}>
        <span className="text_type_main-default text_color_inactive mr-2">
          Уже зарегистрированы?
        </span>
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </div>
    </form>
  );
};

export default RegistrationPage;
