import { configureStore } from '@reduxjs/toolkit';

import { loginSlice } from './login/loginSlice';
import { modulesSlice } from './modules/modulesSlice';
import { itemsSlice } from './items/itemsSlice';

export const store = configureStore({  
    reducer: {
        login: loginSlice.reducer,
        modules: modulesSlice.reducer,
        items: itemsSlice.reducer
    }
});