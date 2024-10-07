import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {NOTES} from "../hosts/hosts";

export const getNotesRtq = createApi({
  reducerPath: "apiRtq/getNotesRtq",
  baseQuery: fetchBaseQuery({
    baseUrl: `${NOTES}`,
  }),
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () =>`/all`}),

  }),
});
export const { useGetNotesQuery } = getNotesRtq;

