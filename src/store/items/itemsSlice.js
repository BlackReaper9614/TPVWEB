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

            console.log(idItem, idStatus)

            state.items = state.items.map( item =>
                item.idItem === idItem ? { ...item, idStatus: idStatus == 1 ? 1 : 2 } : item
            );
        }
    }
});

// Action creators are generated for each case reducer function
export const { setItems, onChangeItemStatus } = itemsSlice.actions;