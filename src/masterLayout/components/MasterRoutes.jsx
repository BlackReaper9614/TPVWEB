import { Navigate, Route, Routes } from 'react-router';
import { modulesMap } from '../../router/modulesMap';

export const MasterRoutes = ({ modules = [] }) => {

    return (


        
        <Routes>

            {

                modules.map(({ idModule, moduleName, moduleURL }) => {

                    const Component = modulesMap[moduleName];

                    if (!Component){

                        console.log('Retorno null con=', moduleName);

                        return null;

                    } 

                    return (

                        <>
                        
                        {

                            console.log('Retorno el componente=', moduleName)

                        }

                        <Route key={idModule} path={moduleURL} element={ <Component /> } />

                        </>

                    );

                })

            }

            <Route path="*" element={<Navigate to="/Ventas" /> } />

        </Routes>

    )

}