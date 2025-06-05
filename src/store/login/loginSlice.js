import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoading: false,
        message: undefined,
        selectedBranch: 0,
        selectedModule: 0,
        status: 'not-authenticated',
        user: {}
    },
    reducers: {
        onChecking: (state) => {
            state.isLoading = true;
        },
        onChecked: (state) => {
            state.isLoading = false;
        },
        onLogin: (state, { payload} ) => {
            state.status = 'authenticated';
            state.user = payload;
            state.message = undefined;
            state.isloading = false;
        },
        onLogout : ( state, { payload } ) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.selectedModule = 0;
            state.selectedBranch = 0;
            state.isLoading = false;
            state.message = payload;
        },
        clearMessage: ( state ) => {
            state.message = undefined;
        },
        setMessage: ( state, { payload } ) => {
            state.message = payload;
        },
        setBranch: ( state, { payload } ) => {
            state.selectedBranch = payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { onChecking, onChecked, onLogin, onLogout, clearMessage, setMessage, setBranch } = loginSlice.actions;