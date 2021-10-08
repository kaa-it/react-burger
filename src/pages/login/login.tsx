import React, { useCallback, useEffect, useState } from "react";
import styles from "./login.module.css";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearPasswordReset, login } from "../../services/authSlice";

const LoginPage = () => {
  const { accessToken, isLoggedIn, isPasswordWasReset } = useSelector(
    // @ts-ignore
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const history = useHistory();

  const [form, setValue] = useState({ email: "", password: "" });

  const handleChange = (e: any) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.goBack();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(clearPasswordReset());
  }, [isPasswordWasReset]);

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(login(form));
    },
    [form]
  );

  if (accessToken) {
    return <Redirect to="/" />;
  }

  return (
    <form className={styles.login}>
      <span className="text_type_main-medium">Вход</span>
      <EmailInput onChange={handleChange} value={form.email} name="email" />
      <PasswordInput
        onChange={handleChange}
        value={form.password}
        name="password"
      />
      <Button type="primary" onClick={handleLogin}>
        Войти
      </Button>
      <div className={`${styles.line} mt-9`}>
        <span className="text_type_main-default text_color_inactive mr-2">
          Вы - новый пользователь?
        </span>
        <Link to="/register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </div>
      <div className={styles.line}>
        <span className="text_type_main-default text_color_inactive mr-2">
          Забыли пароль?
        </span>
        <Link to="/forgot-password" className={styles.link}>
          Восстановить пароль
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;
