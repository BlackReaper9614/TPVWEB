import { Navigate, Route, Routes } from 'react-router-dom'; // Asegúrate que sea 'react-router-dom'
import { modulesMap } from '../../router/modulesMap';
import { XD } from './XD';

export const MasterRoutes = ({ modules = [] }) => {
    if (modules.length === 0) {
        return <h1>Loading...</h1>;
    }

    return (

        <Routes>

            {

                modules.map(({ idModule, moduleName, moduleURL }) => {
                    
                    const Component = modulesMap[moduleName];

                    if (!Component) {
                        
                        console.log('Retorno null con=', moduleName);

                        return null;

                    }

                    console.log('Retorno el componente=', moduleName, 'con la ruta = ', moduleURL);

                    return (
                        <Route
                            key={idModule}
                            path={moduleURL}
                            element={<Component />}
                        />
                    );

                })
                
            }

            {/* Ruta para el componente XD directamente */}
            <Route path="/xd" element={<XD />} />

            {/* Redirección de la raíz */}
            <Route path="/" element={<Navigate to="/xd" />} />

            {/* Ruta comodín opcional */}
            <Route path="*" element={<h1>404 - No encontrado</h1>} />
            
        </Routes>

    );

};