import { createSlice } from '@reduxjs/toolkit';

export const alertMessageSlice = createSlice({
    name: 'alertMessage',
    initialState: {
        message: undefined
    },
    reducers: {
        setAlertMessage: (state, { payload } ) => {
            state.message = payload;
        },
        clearAlertMessage: (state) => {
            state.message = undefined;
        },
    }
});

// Action creators are generated for each case reducer function
export const { setAlertMessage, clearAlertMessage } = alertMessageSlice.actions;