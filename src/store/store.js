import { configureStore } from '@reduxjs/toolkit';

import { alertMessageSlice } from './alertMessage/alertMessageSlice';
import { itemsSlice } from './items/itemsSlice';
import { loadingbarSlice } from './loadingbar/loadingbarSlice';
import { loginSlice } from './login/loginSlice';
import { modulesSlice } from './modules/modulesSlice';

export const store = configureStore({  
    reducer: {
        alertMessage: alertMessageSlice.reducer,
        loadingbar: loadingbarSlice.reducer,
        login: loginSlice.reducer,
        modules: modulesSlice.reducer,
        items: itemsSlice.reducer
    }
});