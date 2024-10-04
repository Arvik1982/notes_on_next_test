'use client'

import styles from "./loginForm.module.css";
import { TLoginFormInputs } from "@/app/types/types";
import { useErrorStatus } from "@/app/store/hooks/hooks";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

export default function LoginForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<TLoginFormInputs>(); // Хук для работы с формой
    
      const { statusNameError, setStatusNameError } = useErrorStatus(errors); // Хук для отслеживания ошибки ввода в поле инпут
    
      const onSubmit = (data: TLoginFormInputs) => {
        Cookies.set("name", data.name.toLowerCase(), { expires: 30 }); // Cookie expires in 30 days
        router.push("/list");
        // можно добавить логику для обработки данных формы, например, отправку на сервер
      };
      const router = useRouter();

return(

<form
        className={styles.container__enter_form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <article className={styles.center__form_item}>
          <label className={styles.form__item_label} htmlFor="pass">
            Введите имя
          </label>
          <input
            className={styles.form__item_input}
            id="pass"
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
      
    )}