
import { setMessage, onLogout, setModules, clearMessage } from '../../../store';

import { TPVAPI } from '../../../apis';
import { useDispatch, useSelector } from 'react-redux';

export const useModulesStore = () => {

    const { modules } = useSelector(state => state.modules );

    const dispatch = useDispatch();

    const startGetModules = async () => {

        try {
            
            const requestHeader = JSON.parse( localStorage.getItem('currentUser')) || {};

            if(!requestHeader.authToken){

                return dispatch( onLogout() );

            }

            const { data } = await TPVAPI.get(`/Modules/GetModulesByUser?idUser=${requestHeader.idUser}`);

            if(data != null && data.length > 0)
            {

                dispatch( setModules( data ) );

            }else{

                const message = {
                    title: 'Error al obtener los modulos',
                    text: `No se obtuvieron modulos, es posible que el usuario no tenga módulos asignados`,
                    icon: 'warning'
                }
    
                dispatch( setMessage( message ) );
    
                setTimeout( () => {
    
                    dispatch( clearMessage() );
    
                }, 10);

            }

        } catch (ex) {
            
            const message = {
                title: 'Error al obtener los modulos',
                text: `No fue posible obtener los modulos relacionados al usuario, Error = ${ex.message}`,
                icon: 'warning'
            }

            dispatch( setMessage( message ) );

            setTimeout( () => {

                dispatch( clearMessage() );

            }, 10);

        }

    }

    return{
        //Propierties
        modules,
        
        //Methoos
        startGetModules

    }

}