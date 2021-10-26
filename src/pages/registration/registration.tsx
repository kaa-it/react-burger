import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import styles from "./registration.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { register } from "../../services/authSlice";
import { useAppDispatch, useAppSelector } from "../../services";
import { IProtectedRouteLocationProps } from "../../components/protected-route/protected-route";
import { TUser } from "../../utils/types";

const RegistrationPage: React.FC = () => {
  const { accessToken } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const { state } = useLocation<IProtectedRouteLocationProps | undefined>();

  const [form, setValue] = useState<TUser>({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(register(form));
    },
    [form]
  );

  if (accessToken) {
    return <Redirect to={{ pathname: state?.from?.pathname || "/" }} />;
  }

  return (
    <form className={styles.registration} onSubmit={handleRegister}>
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
        value={form.password || ""}
        name="password"
      />
      <Button>Зарегистрироваться</Button>
      <div className={`${styles.line} mt-9`}>
        <span className="text_type_main-default text_color_inactive mr-2">
          Уже зарегистрированы?
        </span>
        <Link
          to={{
            pathname: "/login",
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

export default RegistrationPage;
