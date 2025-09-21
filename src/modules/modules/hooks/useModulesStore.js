import { onLogout, setModules, setIsLoadingbar, setAlertMessage, clearAlertMessage } from '../../../store';

import { TPVAPI } from '../../../apis';
import { useDispatch, useSelector } from 'react-redux';

export const useModulesStore = () => {

    const { modules } = useSelector(state => state.modules);

    const dispatch = useDispatch();

    const startGetModules = async () => {

        try {

            dispatch( setIsLoadingbar(true) );

            const requestHeader = JSON.parse(localStorage.getItem('currentUser')) || {};

            if (!requestHeader.authToken) {

                return dispatch( onLogout() );

            }

            const { data } = await TPVAPI.get(`/Modules/GetModulesByUser?idUser=${requestHeader.idUser}`);

            if (data != null && data.length > 0) {

                dispatch( setModules(data) );

            } else {

                const message = {
                    title: 'Error al obtener los modulos',
                    text: `No se obtuvieron modulos, es posible que el usuario no tenga módulos asignados`,
                    icon: 'warning'
                }

                dispatch( setAlertMessage(message) );

                setTimeout(() => {

                    dispatch( clearAlertMessage() );

                }, 10);

            }

        } catch (ex) {

            const message = {
                title: 'Error al obtener los modulos',
                text: `No fue posible obtener los modulos relacionados al usuario, Error = ${ex.message}`,
                icon: 'warning'
            }

            dispatch( setAlertMessage(message) );

            setTimeout(() => {

                dispatch( clearAlertMessage() );

            }, 10);

        } finally {

            dispatch( setIsLoadingbar(false) );

        }

    }

    return {
        //Propierties
        modules,

        //Methoos
        startGetModules

    }

}