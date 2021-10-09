import React, { useState } from "react";
import styles from "./profile.module.css";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useRouteMatch } from "react-router-dom";

const Profile = () => {
  const [form, setValue] = useState({ name: "", email: "", password: "" });

  const { url } = useRouteMatch();

  const handleChange = (e: any) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e: any) => {
    e.preventDefault();
  };

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
        <Link to={url} className={styles.link}>
          Отменить
        </Link>
        <Button type="primary" onClick={handleSave}>
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default Profile;
