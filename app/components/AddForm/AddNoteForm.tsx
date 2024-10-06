"use client";

import { useForm } from "react-hook-form";
import { TNotesFormInputs } from "@/app/types/types";
import { useErrorStatus } from "@/app/store/hooks/hooks";
import { useState } from "react";
import { useAddNewNoteMutation } from "@/app/store/apiRtq/addNoteApi";
import { useGetNotesQuery } from "@/app/store/apiRtq/getNotesApi";
import styles from "./addNoteForm.module.css";

export default function AddNoteForm() {
  const [addNote] = useAddNewNoteMutation();
  const { refetch } = useGetNotesQuery(undefined);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TNotesFormInputs>();

  const { statusNameError, setStatusNameError } = useErrorStatus(errors);

  const onSubmit = async (data: TNotesFormInputs) => {
    if (data.title && data.content) {
      const newNote = {
        id: Date.now(),
        title: data.title,
        content: data.content,
      };
      await addNote({ newNote });
      refetch();
      reset();
    }
  };

  return (
    <form
      className={styles.content__container_form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className={styles.form__input}
        type="text"
        placeholder="Заголовок"
        id="title"
        {...register("title", {
          required: "Заголовок обязательно",
          onChange: () => {
            setStatusNameError(false);
          },
        })}
      />
      <textarea
        className={styles.form__textarea}
        placeholder="Содержимое"
        id="content"
        {...register("content", {
          required: "Содержимое обязательно",
          onChange: () => {
            setStatusNameError(false);
          },
        })}
      />
      <div className={styles.form__buttons_box}>
        <button
          style={false?{ backgroundColor: "var(--transparent-background-1)" }:{}}
          className={styles.buttons__box_button}
          type="submit"
        >
          Сохранить
        </button>
        <button
          style={{ backgroundColor: "var(--transparent-background-3)" }}
          className={styles.buttons__box_button}
        >
          {" "}
          Отменить{" "}
        </button>
      </div>
    </form>
  );
}
