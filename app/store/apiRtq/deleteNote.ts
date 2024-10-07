import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NOTES } from "../hosts/hosts";

export const deleteNoteMutation = createApi({
  reducerPath: "apiRtq/deleteNoteMutation",
  baseQuery: fetchBaseQuery({
    baseUrl: `${NOTES}`,
  }),
  endpoints: (builder) => ({  

    deleteNote: builder.mutation({
      query: (id:string) => ({
        url: `/all/${id}/`, 
        method: "DELETE",
      }),
      
    }),
  }),
});


export const { useDeleteNoteMutation } = deleteNoteMutation;