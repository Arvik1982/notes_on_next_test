"use client";

import styles from "./page.module.css";
import { useGetNotesQuery } from "../../store/apiRtq/getNotesApi";
import { useDeleteNoteMutation } from "../../store/apiRtq/deleteNote";
import { useRouter } from "next/navigation";
import { TNote } from "@/app/types/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import SortIcon from "@/app/components/Icons/SortIcon";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks/hooks";
import { setData } from "@/app/store/slices/noteSlice";

export default function ListOfNotes() {
  const {
    data: notes,
    error,
    isLoading,
    refetch,
  } = useGetNotesQuery(undefined);

  const [sorted, setSorted] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState<TNote[]>();
  const [deleteNote] = useDeleteNoteMutation();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.notesSlice.data);

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      refetch();
    } catch (error) {
      console.error("Ошибка при удалении заметки:", error);
    }
  };

  const handleSort = (
    filteredNotes: TNote[],
    setFilteredNotes: Dispatch<SetStateAction<TNote[] | undefined>>
  ) => {
    setFilteredNotes(filteredNotes.slice().reverse());
    setSorted(!sorted);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    dispatch(setData(event.target.value));
  };

  const debouncedSearch = debounce((text): void => {
    setFilteredNotes(
      notes.filter((note: TNote) => {
        return note.title.includes(text);
      })
    );
  }, 300);

  useEffect(() => {
    debouncedSearch(userData);
    return () => {
      debouncedSearch.cancel();
    };
  }, [userData, notes]);

  return (
    <>
      {isLoading && <span>loading...</span>}
      {!error && (
        <section className={styles.content__section}>
          <article className={styles.content__section_filters}>
            <input
              placeholder="Название"
              className={styles.filters__input}
              type="text"
              value={userData}
              onChange={handleInputChange}
            />

            <button
              style={{
                transform: sorted ? "rotateX(180deg)" : "rotateX(0deg)",
                transition: "0.2s",
              }}
              className={styles.filters__button}
              onClick={() => {
                if (filteredNotes) {
                  handleSort(filteredNotes, setFilteredNotes);
                }
              }}
            >
              <SortIcon />
            </button>
          </article>
          {filteredNotes &&
            filteredNotes
              .slice()
              .reverse()
              .map((note: TNote, index: number) => {
                return (
                  <article key={index} className={styles.content__section_note}>
                    <div
                      onClick={() => router.push(`/notes/current/${note.id}`)}
                      className={styles.section__note_text}
                    >
                      <h2 className={styles.section__note_title} key={index}>
                        {note.title}
                      </h2>
                      <p className={styles.section__note_content}>
                        {note.content}
                      </p>
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
                        onClick={() => router.push(`/notes/current/${note.id}`)}
                      >
                        Изменить
                      </button>
                    </div>
                  </article>
                );
              })}
        </section>
      )}
      {filteredNotes?.length === 0 && <h3>Нет заметок</h3>}
      {error && (
        <section className={styles.content__section}>
          <h3>Ошибка, проверьте сервер, попробуйте обновить страницу позже</h3>
        </section>
      )}
    </>
  );
}
