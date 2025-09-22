import { createSlice } from '@reduxjs/toolkit';

export const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
        itemsListSize: 0,
        itemsListCurrentPage: 0
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

        },
        setItemsListSize: (state, { payload }) => {

            state.itemsListSize = payload;

        },
        setItemsListCurrentPage: (state, { payload }) => {

            state.itemsListCurrentPage = payload;

        },
    }
});

// Action creators are generated for each case reducer function
export const { setItems, onChangeItemStatus, onUpdateItem, setItemsListSize, setItemsListCurrentPage } = itemsSlice.actions;