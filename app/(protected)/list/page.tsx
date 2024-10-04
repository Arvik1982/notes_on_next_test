"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { useAddNewNoteMutation } from "../../store/apiRtq/addNoteApi";
import { useGetNotesQuery } from "../../store/apiRtq/getNotesApi";
import { useDeleteNoteMutation } from "../../store/apiRtq/deleteNote";
import { useUpdateNoteMutation } from "../../store/apiRtq/updateNote";

export default function ListOfNotes() {
  const { data, error, isLoading, refetch } = useGetNotesQuery(undefined);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [addNote] = useAddNewNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();
  const [updateNote] = useUpdateNoteMutation();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    if (title && content) {
      const newNote = { id: Date.now(), title: title, content: content };
      await addNote({ newNote }); // Добавляем новую заметку
      refetch();
      setTitle(""); // Очищаем поле заголовка
      setContent(""); // Очищаем поле содержимого
    }
  };

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
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>list</h1>

          {data?.map((note, index) => {
            return (
              <div>
                <div key={index}>
                  {note.title}:{note.content}
                </div>
                <button onClick={() => handleDelete(note.id)}>Удалить</button>
              </div>
            );
          })}
          <button onClick={() => handleUpdate(1)}>Update111</button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Содержимое"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit">Добавить заметку</button>
        </form>
      </main>
      <footer className={styles.footer}>footer</footer>
    </div>
  );
}
