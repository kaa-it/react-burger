import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "./login.module.css";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation } from "react-router-dom";
import { clearPasswordReset, login } from "../../services/authSlice";
import { useAppDispatch, useAppSelector } from "../../services";
import { TCredentials } from "../../utils/types";
import { IProtectedRouteLocationProps} from "../../components/protected-route/protected-route";

declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

const LoginPage: React.FC = () => {
  const { accessToken, isLoggedIn, isPasswordWasReset } = useAppSelector(
    (state) => state.auth
  );

  const state  = useLocation().state as IProtectedRouteLocationProps;

  const dispatch = useAppDispatch();

  const [form, setValue] = useState<TCredentials>({ email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isPasswordWasReset) {
      dispatch(clearPasswordReset());
    }
  }, [isPasswordWasReset, dispatch]);

  const handleLogin = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(login(form));
    },
    [form, dispatch]
  );

  if (isLoggedIn) {
    return <Navigate to={{ pathname: state?.from || "/" }} replace/>;
  }

  if (accessToken) {
    return <Navigate to="/" replace/>;
  }

  return (
    <form className={styles.login} onSubmit={handleLogin}>
      <span className="text_type_main-medium">Вход</span>
      <EmailInput onChange={handleChange} value={form.email} name="email" />
      <PasswordInput        onChange={handleChange}
        value={form.password}
        name="password"
      />
      <Button htmlType="submit">Войти</Button>
      <div className={`${styles.line} mt-9`}>
        <span className="text_type_main-default text_color_inactive mr-2">
          Вы - новый пользователь?
        </span>

        <Link
          to="/register"
          state={state ? { from: state.from } : {}}
          className={styles.link}
        >
          Зарегистрироваться
        </Link>
      </div>
      <div className={styles.line}>
        <span className="text_type_main-default text_color_inactive mr-2">
          Забыли пароль?
        </span>
        <Link
          to="/forgot-password"
          state={state ? { from: state.from } : {}}
          className={styles.link}
        >
          Восстановить пароль
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;
