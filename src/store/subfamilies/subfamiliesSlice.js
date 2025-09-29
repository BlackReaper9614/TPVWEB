import { createSlice } from '@reduxjs/toolkit';

export const subfamiliesSlice = createSlice({
    name: 'subfamilies',
    initialState: {
        subfamiliesList: []
    },
    reducers: {
        setSubfamiliesList: (state, { payload } ) => {
            state.subfamiliesList = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { setSubfamiliesList } = subfamiliesSlice.actions;