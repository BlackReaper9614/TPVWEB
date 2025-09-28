import { createSlice } from '@reduxjs/toolkit';

export const familiesSlice = createSlice({
    name: 'families',
    initialState: {
        familiesList: []
    },
    reducers: {
        setFamiliesList: (state, { payload } ) => {
            state.familiesList = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { setFamiliesList } = familiesSlice.actions;