import { Navigate, Route, Routes } from 'react-router';

import { Login } from './../modules/login/pages/Login';
import { MasterLayout } from '../masterLayout/layout/MasterLayout';
import { useLoginStore } from '../modules/login/hooks/useLoginStore';
import { useEffect } from 'react';

export const AppRouter = () => {
  
    const { status, checkAuthUser } = useLoginStore();
    
    useEffect(() => {
    
        checkAuthUser();

    }, []);
    
    return (
        
        <Routes>

            {
                (status === 'not-authenticated')
                ? <Route path="/Auth/Login" element={ <Login /> } />
                : <Route path="/*" element={  <MasterLayout /> } />
            }

            <Route path="/*" element={ <Navigate to="/Auth/Login" /> } />

        </Routes>

    )

}