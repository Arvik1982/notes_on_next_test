"use client";

import AddNoteForm from "@/app/components/AddForm/AddNoteForm";
import { useGetCurrentNoteQuery } from "@/app/store/apiRtq/getCurrentNote";
import { h3 } from "framer-motion/client";
import { useParams } from "next/navigation";

export default function ChangeNote() {
  const params = useParams();
  const currentId = Array.isArray(params.currentId)
    ? params.currentId[0]
    : params.currentId;

  const { data: note, error } = useGetCurrentNoteQuery(currentId);

  return (
    <>
      {!error && <AddNoteForm currentNote={note} />}
      {error && <h3>Ошибка, попробуйте позже</h3>}
    </>
  );
}
