"use client";

import styles from "./page.module.css";
import { useAddNewNoteMutation } from "../../store/apiRtq/addNoteApi";
import { useGetNotesQuery } from "../../store/apiRtq/getNotesApi";
import { useDeleteNoteMutation } from "../../store/apiRtq/deleteNote";
import { useUpdateNoteMutation } from "../../store/apiRtq/updateNote";
import ContentWrapper from "@/app/components/ContentWrapper/ContentWrapper";

export default function ListOfNotes() {
  const {
    data: notes,
    error,
    isLoading,
    refetch,
  } = useGetNotesQuery(undefined);

  const [deleteNote] = useDeleteNoteMutation();
  const [updateNote] = useUpdateNoteMutation();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (title && content) {
  //     const newNote = { id: Date.now(), title: title, content: content };
  //     await addNote({ newNote });
  //     refetch();
  //     setTitle("");
  //     setContent("");
  // };}

  const handleUpdate = async (id: number) => {
    const updatingNote = {
      id: id,
      title: "567test",
      content: "new test content",
    };

    try {
      await updateNote({ updatingNote }); // Удаляем заметку по ID
      refetch(); // Обновляем список заметок после удаления
    } catch (error) {
      console.error("Ошибка при update заметки:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNote(id); // Удаляем заметку по ID
      refetch(); // Обновляем список заметок после удаления
    } catch (error) {
      console.error("Ошибка при удалении заметки:", error);
    }
  };

  return (
    <>
      <section className={styles.content__section}>
        {notes?.map((note, index) => {
          return (
            <article key={index} className={styles.content__section_note}>
              <div className={styles.section__note_text}>
                <h2 className={styles.section__note_title} key={index}>
                  {note.title}
                </h2>
                <p className={styles.section__note_content}>{note.content}</p>
              </div>
              <div className={styles.section__note_buttons}>
                <button
                  className={`${styles.button__delete}`}
                  onClick={() => handleDelete(note.id)}
                >
                  Удалить
                </button>
                <button
                  className={styles.section__note_button}
                  onClick={() => handleUpdate(1)}
                >
                  Изменить
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <section className={styles.content__section}></section>
      </>
  );
}
