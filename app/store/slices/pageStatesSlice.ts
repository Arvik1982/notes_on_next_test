
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    scrollToUpId: '',


};

const pageStatesSlice = createSlice({
    name: 'pageStatesSlice',
    initialState,
    reducers: {
        setScrollToUpId: (state, action) => {
            state.scrollToUpId=action.payload;
            console.log(state.scrollToUpId)
        },
      
       
    },
});

export const { setScrollToUpId } = pageStatesSlice.actions;
export default pageStatesSlice.reducer;