import { createSlice } from '@reduxjs/toolkit';

export const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        items: []
    },
    reducers: {
        setItems: ( state, { payload } ) => {
            state.items = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { setItems } = itemsSlice.actions;