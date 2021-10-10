import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../services/authSlice";

const Profile = () => {
  // @ts-ignore
  const { user } = useSelector((state) => state.auth);

  const [form, setValue] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    password: "",
  });

  const { url } = useRouteMatch();
  const history = useHistory();

  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e: any) => {
    e.preventDefault();
    dispatch(updateUser(form));
    setValue({ ...form, password: "" });
  };

  const handleReset = () => {
    history.push("/");
    setTimeout(() => history.push(`${url}`), 10);
  };

  useEffect(() => {
    //if (user === null) {
    dispatch(getUser());
    //}
  }, [user?.name, user?.email]);

  useEffect(() => {
    if (user) {
      setValue({ ...form, name: user.name, email: user.email });
    }
  }, [user?.name, user?.email]);

  return (
    <form className={styles.profile}>
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
      <div className={styles.actions}>
        <span className={styles.link} onClick={handleReset}>
          Отменить
        </span>
        <Button type="primary" onClick={handleSave}>
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default Profile;
