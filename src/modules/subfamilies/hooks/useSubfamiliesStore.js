import { useDispatch, useSelector } from 'react-redux';
import { clearAlertMessage, onLogout, setAlertMessage, setIsLoadingbar } from '../../../store';
import { TPVAPI } from '../../../apis';
import { setSubfamiliesList } from '../../../store/subfamilies/subfamiliesSlice';

export const useSubfamiliesStore = () => {

    const dispatch = useDispatch();

    const { subfamiliesList } = useSelector(state => state.subfamilies);

    const startLoadingSubfamilies = async() => {

        try {
            
            dispatch( setIsLoadingbar(true) );

            const requestHeader = JSON.parse(localStorage.getItem('currentUser')) || {};

            if (!requestHeader.authToken) {

                return dispatch( onLogout() );

            }

            const { data } = await TPVAPI.get('/SubfamiliesGetSubfamilies/GetSubfamilies');
        
            dispatch( setSubfamiliesList(data) );

        } catch (ex) {
            
            const message = {
                title: 'Error al obtener las subfamilias',
                text: `No fue posible obtener las subfamilias, Error = ${ex.message}`,
                icon: 'error'
            }

            dispatch( setAlertMessage(message) );

            setTimeout(() => {
                
                dispatch( clearAlertMessage() );

            }, 10);

        } finally {

            dispatch( setIsLoadingbar(false) );

        }

    };

    const startLoadingSubfamiliesByFamily = async(idFamily) => {

        try {
            
            dispatch( setIsLoadingbar(true) );

            const requestHeader = JSON.parse(localStorage.getItem('currentUser')) || {};

            if (!requestHeader.authToken) {

                return dispatch( onLogout() );

            }

            const { data } = await TPVAPI.get(`/Subfamilies/GetSubfamiliesByFamily?idFamily=${idFamily}`);
        
            dispatch( setSubfamiliesList(data) );

        } catch (ex) {
            
            const message = {
                title: 'Error al obtener las subfamilias por familia',
                text: `No fue posible obtener las subfamilias por familia, Error = ${ex.message}`,
                icon: 'error'
            }

            dispatch( setAlertMessage(message) );

            setTimeout(() => {
                
                dispatch( clearAlertMessage() );

            }, 10);

        } finally {

            dispatch( setIsLoadingbar(false) );

        }

    };


    return {
        // Methods
        startLoadingSubfamilies,
        startLoadingSubfamiliesByFamily,

        // Propierties
        subfamiliesList,
    }

}