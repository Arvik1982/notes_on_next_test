import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NOTES } from "../hosts/hosts";
import { TNote } from "@/app/types/types";

export const updateNoteMutation = createApi({
  reducerPath: "apiRtq/updateNoteMutation",
  baseQuery: fetchBaseQuery({
    baseUrl: `${NOTES}`,
  }),
  endpoints: (builder) => ({
    updateNote: builder.mutation({
      query: (updatingNote: TNote) => ({
        url: `/all/${updatingNote.id}/`,
        method: "PATCH",
        body: {
          title: updatingNote.title,
          content: updatingNote.content,
        },
      }),
    }),
  }),
});

export const { useUpdateNoteMutation } = updateNoteMutation;
