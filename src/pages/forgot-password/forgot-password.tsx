import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import styles from "./forgot-password.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation } from "react-router-dom";
import { checkResetPassword } from "../../services/authSlice";
import { useAppDispatch, useAppSelector } from "../../services";
import { IProtectedRouteLocationProps } from "../../components/protected-route/protected-route";

interface IForgotPasswordState {
  email: string;
}

const ForgotPasswordPage: React.FC = () => {
  const { accessToken, isResetPassword } = useAppSelector(
    (state) => state.auth
  );

  const dispatch = useAppDispatch();

  const state  = useLocation().state as IProtectedRouteLocationProps;

  const [form, setValue] = useState<IForgotPasswordState>({ email: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleResetPassword = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(checkResetPassword(form.email));
    },
    [form]
  );

  if (accessToken) {
    console.log("fp rd home");
    return <Navigate to="/" replace/>;
  }

  if (isResetPassword) {
    return (
      <Navigate
        to="/reset-password"
        state={state ? { from: state.from } : {}}
      />
    );
  }

  return (
    <form className={styles.forgot_password} onSubmit={handleResetPassword}>
      <span className="text_type_main-medium">Восстановление пароля</span>
      <EmailInput onChange={handleChange} value={form.email} name="email" />
      <Button>Восстановить</Button>
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

export default ForgotPasswordPage;
