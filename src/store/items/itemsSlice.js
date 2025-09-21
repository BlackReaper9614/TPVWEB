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
        onChangeItemStatus: ( state, { payload } ) => {

            const { idItem, idStatus} = payload;

            state.items = state.items.map( item =>
                item.idItem === idItem ? { ...item, idStatus: idStatus == 1 ? 1 : 2 } : item
            );
            
        },
        onUpdateItem: (state, { payload }) => {

            state.items = state.item.map( item => 
                item.idItem === payload.idItem ? payload : item
            );

        }
    }
});

// Action creators are generated for each case reducer function
export const { setItems, onChangeItemStatus, onUpdateItem } = itemsSlice.actions;