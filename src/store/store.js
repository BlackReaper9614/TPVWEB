import { configureStore } from '@reduxjs/toolkit';

import { alertMessageSlice } from './alertMessage/alertMessageSlice';
import { itemsSlice } from './items/itemsSlice';
import { loadingbarSlice } from './loadingbar/loadingbarSlice';
import { loginSlice } from './login/loginSlice';
import { modulesSlice } from './modules/modulesSlice';
import { unitMeasuresSlice } from './unitMeasures/unitMeasuresSlice';
import { familiesSlice } from './families/familiesSlice';
import { subfamiliesSlice } from './subfamilies/subfamiliesSlice';

export const store = configureStore({  
    reducer: {
        alertMessage: alertMessageSlice.reducer,
        loadingbar: loadingbarSlice.reducer,
        login: loginSlice.reducer,
        modules: modulesSlice.reducer,
        items: itemsSlice.reducer,
        unitMeasures: unitMeasuresSlice.reducer,
        families: familiesSlice.reducer,
        subfamilies: subfamiliesSlice.reducer,
    }
});