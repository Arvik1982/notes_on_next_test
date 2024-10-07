import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NOTES } from "../hosts/hosts";
import { TNote } from "@/app/types/types";

type TAddNewNote = {
  newNote: TNote;
};

export const addNewNoteMutation = createApi({
  reducerPath: "apiRtq/addNewNoteRtq",
  baseQuery: fetchBaseQuery({
    baseUrl: `${NOTES}`,
  }),
  endpoints: (builder) => ({
    addNewNote: builder.mutation<void,TAddNewNote>({
      query: ({ newNote}) => ({
        url: `/all`,
        method: "POST",
        body: {
          id: newNote.id,
          title: newNote.title,
          content: newNote.content,
        },
      }),
    }),
  }),
});

export const { useAddNewNoteMutation } = addNewNoteMutation;
