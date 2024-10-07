
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: '',


};

const noteSlice = createSlice({
    name: 'noteSlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data=action.payload;
            console.log(state.data)
        },
      
       
    },
});

export const { setData } = noteSlice.actions;
export default noteSlice.reducer;