import { createSlice } from '@reduxjs/toolkit';

export const unitMeasuresSlice = createSlice({
    name: 'unitMeasures',
    initialState: {
        unitMeasuresList: []
    },
    reducers: {
        setUnitMeasuresList: (state, { payload } ) => {
            state.unitMeasuresList = payload;
        },
    }
});

// Action creators are generated for each case reducer function
export const { setUnitMeasuresList } = unitMeasuresSlice.actions;