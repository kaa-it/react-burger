import React, { useCallback, useState } from "react";
import styles from "./reset-password.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../services/authSlice";

const ResetPasswordPage = () => {
  const { accessToken, isResetPassword, isPasswordWasReset } = useSelector(
    // @ts-ignore
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const { state } = useLocation();

  const [form, setValue] = useState({ token: "", password: "" });

  const handleChange = (e: any) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleResetPassword = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(resetPassword(form));
    },
    [form]
  );

  if (isPasswordWasReset) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          // @ts-ignore
          state: state ? { from: state.from } : {},
        }}
      />
    );
  }

  if (accessToken || !isResetPassword) {
    return <Redirect to="/" />;
  }

  return (
    <form className={styles.reset_password} onSubmit={handleResetPassword}>
      <span className="text_type_main-medium">Восстановление пароля</span>
      <PasswordInput
        onChange={handleChange}
        value={form.password}
        name="password"
      />
      <Input
        type="text"
        onChange={handleChange}
        value={form.token}
        placeholder="Введите код из письма"
        name="token"
      />
      <Button>Сохранить</Button>
      <div className={`${styles.line} mt-9`}>
        <span className="text_type_main-default text_color_inactive mr-2">
          Вспомнили пароль?
        </span>
        <Link
          to={{
            pathname: "/login",
            //@ts-ignore
            state: state ? { from: state.from } : {},
          }}
          className={styles.link}
        >
          Войти
        </Link>
      </div>
    </form>
  );
};

export default ResetPasswordPage;
