import { configureStore } from '@reduxjs/toolkit';
import notesSlice from './slices/noteSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { getNotesRtq } from './apiRtq/getNotesApi';
import { addNewNoteMutation } from './apiRtq/addNoteApi';
import { deleteNoteMutation } from './apiRtq/deleteNote';
import { updateNoteMutation } from './apiRtq/updateNote';
import { getCurrentNoteRtq } from './apiRtq/getCurrentNote';

const store = configureStore({
    reducer: {
        notesSlice: notesSlice,
        [getNotesRtq.reducerPath]: getNotesRtq.reducer,
        [getCurrentNoteRtq.reducerPath]: getCurrentNoteRtq.reducer,
        [addNewNoteMutation.reducerPath]: addNewNoteMutation.reducer,
        [deleteNoteMutation.reducerPath]: deleteNoteMutation.reducer,
        [updateNoteMutation.reducerPath]: updateNoteMutation.reducer,
    },
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare()
          .concat(getNotesRtq.middleware)
          .concat(getCurrentNoteRtq.middleware)
          .concat(addNewNoteMutation.middleware)
          .concat(deleteNoteMutation.middleware)
          .concat(updateNoteMutation.middleware),
});

setupListeners(store.dispatch);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default store;