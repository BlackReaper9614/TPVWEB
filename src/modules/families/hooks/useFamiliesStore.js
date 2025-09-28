import { useDispatch, useSelector } from 'react-redux';
import { setFamiliesList, setIsLoadingbar } from '../../../store';
import { TPVAPI } from '../../../apis';

export const useFamiliesStore = () => {

    const dispatch = useDispatch();

    const { familiesList } = useSelector(state => state.families);

    const startLoadingFamilies = async () => {

        try {

            dispatch(setIsLoadingbar(true));

            const requestHeader = JSON.parse(localStorage.getItem('currentUser')) || {};

            if (!requestHeader.authToken) {

                return dispatch(onLogout());

            }

            const { data } = await TPVAPI.get('/Families/GetFamilies');

            dispatch(setFamiliesList(data));

        } catch (ex) {

            const message = {
                title: 'Error al obtener las familias',
                text: `No fue posible obtener las familias, Error = ${ex.message}`,
                icon: 'error'
            }

            dispatch( setAlertMessage(message) );

            setTimeout(() => {

                dispatch( clearAlertMessage() );

            }, 10);

        } finally {

            dispatch(setIsLoadingbar(false));

        }

    }

    return {
        // Methods
        startLoadingFamilies,

        // Propierties
        familiesList

    }

}