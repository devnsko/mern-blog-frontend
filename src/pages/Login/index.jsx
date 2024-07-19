import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";
import { fetchLogin, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, formState: { errors, isValid}} = useForm({
    defaultValues: {
      "username": "Den",
      "password": "qwerty"
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchLogin(values));
    console.log(data);  

    if (!data.payload) {
      return alert('Неверный логин или пароль');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Username"
          error={Boolean(errors.username?.message)}
          helperText={errors.username?.message}
          {...register("username", { required: 'Укажите имя пользователя', minLength: { value: 3, message: 'Минимальная длина 3 символа' } })}
          fullWidth/>
        <TextField 
        className={styles.field} 
        type="password"
        label="Пароль" 
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register("password", { required: 'Укажите пароль', minLength: { value: 5, message: 'Минимальная длина 5 символа' } })}
        fullWidth />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
