import { createSlice } from '@reduxjs/toolkit';

export const modulesSlice = createSlice({
    name: 'modules',
    initialState: {
        modules: [],
        selectedModule: 0
    },
    reducers: {
        setModules: (state, { payload } ) => {
            state.modules = payload;
        },
        clearModules: (state) => {
            state.modules = {}
        }
    }
});

// Action creators are generated for each case reducer function
export const { setModules, clearModules } = modulesSlice.actions;