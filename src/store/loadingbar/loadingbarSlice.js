import { createSlice } from '@reduxjs/toolkit';

export const loadingbarSlice = createSlice({
    name: 'loadingbar',
    initialState: {
        isLoading: false
    },
    reducers: {
        setIsLoadingbar: (state, { payload }) => {
            state.isLoading = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { setIsLoadingbar } = loadingbarSlice.actions;