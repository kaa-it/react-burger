import React, { FormEvent, useEffect, useState } from "react";
import styles from "./profile.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, useLocation } from "react-router-dom";
import { getUser, updateUser } from "../../services/authSlice";
import { useAppDispatch, useAppSelector } from "../../services";
import { TUser } from "../../utils/types";

declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [form, setValue] = useState<TUser>({
    name: user ? user.name : "",
    email: user ? user.email : "",
    password: "",
  });

  const url = useLocation().pathname;
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateUser(form));
    setValue({ ...form, password: "" });
  };

  const handleReset = () => {
    navigate("/");
    setTimeout(() => navigate(`${url}`), 10);
  };

  useEffect(() => {
    dispatch(getUser());
  }, [user?.name, user?.email, dispatch]);

  useEffect(() => {
    if (user) {
      setValue({ ...form, name: user.name, email: user.email });
    }
  }, [user?.name, user?.email]);

  return (
    <form className={styles.profile} onSubmit={handleSave}>
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
      <div className={styles.actions}>
        <span className={styles.link} onClick={handleReset}>
          Отменить
        </span>
        <Button htmlType="button">Сохранить</Button>
      </div>
    </form>
  );
};

export default Profile;
