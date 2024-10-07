"use client";

import styles from "./loginForm.module.css";
import { TLoginFormInputs } from "@/app/types/types";
import { useErrorStatus } from "@/app/store/hooks/hooks";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormInputs>();

  const [statusNameError, setStatusNameError] = useState(false);
  const onSubmit = (data: TLoginFormInputs) => {
    Cookies.set("name", data.name.toLowerCase(), { expires: 30 });
    router.push("/list");
  };

  useEffect(() => {
    setStatusNameError(true);
  }, [errors.name]);

  return (
    <>
      {" "}
      <h1>Вход</h1>
      <form
        className={styles.container__enter_form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <article className={styles.center__form_item}>
          <label className={styles.form__item_label} htmlFor="name">
            Введите имя
          </label>
          <input
            className={styles.form__item_input}
            id="name"
            {...register("name", {
              required: "Имя обязательно",
              onChange: () => {
                setStatusNameError(false);
              },
            })}
          ></input>
          {statusNameError && (
            <p className={styles.form__item_error}>{errors.name?.message}</p>
          )}
        </article>
        <button className={styles.center__form_button} type="submit">
          Войти
        </button>
      </form>
    </>
  );
}
