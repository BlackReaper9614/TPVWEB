import { configureStore } from '@reduxjs/toolkit';

import { loginSlice } from './login/loginSlice';
import { modulesSlice } from './modules/modulesSlice';

export const store = configureStore({  
    reducer: {
        login: loginSlice.reducer,
        modules: modulesSlice.reducer
    }
});