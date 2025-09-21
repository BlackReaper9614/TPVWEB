import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        selectedBranch: 0,
        selectedModule: 0,
        status: 'not-authenticated',
        user: {}
    },
    reducers: {
        onLogin: (state, { payload} ) => {
            state.status = 'authenticated';
            state.user = payload;
        },
        onLogout : ( state, { payload } ) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.selectedModule = 0;
            state.selectedBranch = 0;
        },
        setBranch: ( state, { payload } ) => {
            state.selectedBranch = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { onLogin, onLogout, setBranch } = loginSlice.actions;