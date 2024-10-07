"use client";

import { useForm } from "react-hook-form";
import { TNote, TNotesFormInputs } from "@/app/types/types";
import { useErrorStatus } from "@/app/store/hooks/hooks";
import { useAddNewNoteMutation } from "@/app/store/apiRtq/addNoteApi";
import { useGetNotesQuery } from "@/app/store/apiRtq/getNotesApi";
import styles from "./addNoteForm.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUpdateNoteMutation } from "@/app/store/apiRtq/updateNote";
import { useGetCurrentNoteQuery } from "@/app/store/apiRtq/getCurrentNote";

type TProps = {
  currentNote?: TNote;
};

export default function AddNoteForm({ currentNote }: TProps) {
  const [addNote] = useAddNewNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const { refetch } = useGetNotesQuery(undefined);
  const { refetch: refetchCurrent } = useGetCurrentNoteQuery(
    currentNote?.id || "",
    {
      skip: !currentNote,
    }
  );

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TNotesFormInputs>();

  const {
    statusTitleError,
    statusContentError,
    setStatusTitleError,
    setStatusContentError,
  } = useErrorStatus(errors);

  const onSubmitCreate = async (data: TNotesFormInputs) => {
    if (data.title && data.content) {
      const newNote = {
        id: String(Date.now()),
        title: data.title,
        content: data.content,
      };
      await addNote({ newNote });
      refetch();
      reset();
      router.push("/list");
    }
  };

  const onSubmitChange = async (data: TNotesFormInputs) => {
    if (data.title && data.content && currentNote) {
      const newNote = {
        id: currentNote.id,
        title: data.title,
        content: data.content,
      };
      await updateNote(newNote);
      refetch();
      refetchCurrent();
      router.push("/list");
    }
  };

  useEffect(() => {
    if (currentNote) {
      setValue("title", currentNote.title);
      setValue("content", currentNote.content);
    }
  }, [currentNote, setValue]);

  return (
    <form
      className={styles.content__container_form}
      onSubmit={
        !currentNote
          ? handleSubmit(onSubmitCreate)
          : handleSubmit(onSubmitChange)
      }
    >
      <label className={styles.container__form_item} htmlFor="title">
        <input
          className={styles.form__input}
          type="text"
          placeholder="Заголовок"
          id="title"
          {...register("title", {
            validate: (value) =>
              !(!value && !currentNote?.title) || "Заголовок обязателен",
            onChange: () => {
              setStatusTitleError(false);
            },
          })}
        />
        {statusTitleError && (
          <span className={styles.error}>{errors.title?.message}</span>
        )}
      </label>
      <label className={styles.container__form_item} htmlFor="content">
        <textarea
          className={styles.form__textarea}
          placeholder="Содержимое"
          id="content"
          {...register("content", {
            validate: (value) =>
              !(!value && !currentNote?.content) || "Содержимое обязательно",
            onChange: () => {
              setStatusContentError(false);
            },
          })}
        />
        {statusContentError && (
          <span className={styles.error}>{errors.content?.message}</span>
        )}
      </label>

      <div className={styles.form__buttons_box}>
        <button
          style={{ backgroundColor: "var(--transparent-background-1)" }}
          className={styles.buttons__box_button}
          type="submit"
        >
          Сохранить
        </button>
        <button
          type="button"
          onClick={() => {
            router.push("/list");
          }}
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
