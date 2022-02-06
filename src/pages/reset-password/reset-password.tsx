import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import styles from "./reset-password.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation } from "react-router-dom";
import { resetPassword } from "../../services/authSlice";
import { useAppDispatch, useAppSelector } from "../../services";
import { TResetPasswordArgs } from "../../utils/types";
import { IProtectedRouteLocationProps } from "../../components/protected-route/protected-route";

const ResetPasswordPage: React.FC = () => {
  const { accessToken, isResetPassword, isPasswordWasReset } = useAppSelector(
    (state) => state.auth
  );

  const dispatch = useAppDispatch();

  const state  = useLocation().state as IProtectedRouteLocationProps;

  const [form, setValue] = useState<TResetPasswordArgs>({
    token: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleResetPassword = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(resetPassword(form));
    },
    [form]
  );

  if (isPasswordWasReset) {
    return (
      <Navigate
        to="/login"
        state={state ? { from: state.from } : {}}
      />
    );
  }

  if (accessToken || !isResetPassword) {
    return <Navigate to="/" replace/>;
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
          to="/login"
          state={state ? { from: state.from } : {}}
          className={styles.link}
        >
          Войти
        </Link>
      </div>
    </form>
  );
};

export default ResetPasswordPage;
