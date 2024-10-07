import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NOTES } from "../hosts/hosts";

export const getCurrentNoteRtq = createApi({
  reducerPath: "apiRtq/getCurrentNoteRtq",
  baseQuery: fetchBaseQuery({
    baseUrl: `${NOTES}`,
  }),
  endpoints: (builder) => ({
    getCurrentNote: builder.query({
      query: (id: string) => `/all/${id}`,
    }),
  }),
});
export const { useGetCurrentNoteQuery } = getCurrentNoteRtq;
