import React, { useCallback, useState } from "react";
import styles from "./forgot-password.module.css";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkResetPassword } from "../../services/authSlice";

const ForgotPasswordPage = () => {
  // @ts-ignore
  const { accessToken, isResetPassword } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const history = useHistory();

  const [form, setValue] = useState({ email: "" });

  const handleChange = (e: any) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleResetPassword = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(checkResetPassword(form.email));
    },
    [form]
  );

  if (accessToken) {
    console.log("fp rd home");
    return <Redirect to="/" />;
  }

  if (isResetPassword) {
    history.push("/reset-password");
    return null;
  }

  return (
    <form className={styles.forgot_password}>
      <span className="text_type_main-medium">Восстановление пароля</span>
      <EmailInput onChange={handleChange} value={form.email} name="email" />
      <Button type="primary" onClick={handleResetPassword}>
        Восстановить
      </Button>
      <div className={`${styles.line} mt-9`}>
        <span className="text_type_main-default text_color_inactive mr-2">
          Вспомнили пароль?
        </span>
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordPage;
