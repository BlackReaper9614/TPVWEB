import { Navigate, Route, Routes } from 'react-router-dom';

import { Login } from './../modules/login/pages/Login';
import { MasterLayout } from '../masterLayout/layout/MasterLayout';
import { useLoginStore } from '../modules/login/hooks/useLoginStore';
import { useEffect } from 'react';
import { useModulesStore } from '../modules/modules/hooks/useModulesStore';
import { Items } from '../modules/items/pages/Items';
import { Sales } from '../modules/sales/pages/Sales';
import { modulesMap } from './modulesMap';

export const AppRouter = () => {

    const { status, checkAuthUser } = useLoginStore();

    const { startGetModules, modules } = useModulesStore();

    useEffect(() => {

        checkAuthUser();

    }, []);

    useEffect(() => {

        if (status === 'authenticated') {

            startGetModules();

        }

    }, [status]);

    return (

        <Routes>

            {
                (status === 'not-authenticated')
                    ?

                    <Route path="/Auth/*" element={<Login />} />

                    :
                    (

                        <Route path='/*' element={<MasterLayout />}>

                            {/* Mapeo dinámico de módulos */}
                            {

                                modules.map(({ idModule, moduleName, moduleURL }) => {

                                    const Component = modulesMap[moduleName];

                                    if (!Component) {

                                        // console.log('Retorno null con=', moduleName);

                                        return null;

                                    }

                                    // console.log('Retorno el componente=', moduleName, 'con la ruta = ', moduleURL);

                                    return (
                                        <Route
                                            key={idModule}
                                            path={`${moduleURL.replace(/^\/+/, '')}/*`}
                                            element={<Component />}
                                        />
                                    );

                                })

                            }

                            {/* Ruta por defecto */}
                            <Route path='*' element={<Items />} />

                        </Route>

                    )
            }

        </Routes>

    )

}