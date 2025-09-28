import { useDispatch, useSelector } from "react-redux"
import { clearAlertMessage, onLogout, setAlertMessage, setIsLoadingbar, setUnitMeasuresList } from "../../../store";
import { TPVAPI } from "../../../apis";


export const useUnitMeasures = () => {

    const dispatch = useDispatch();

    const { unitMeasuresList } = useSelector(state => state.unitMeasures)

    const startLoadingUnitMeasures = async () => {

        try {

            dispatch( setIsLoadingbar(true) );

            const requestHeader = JSON.parse(localStorage.getItem('currentUser')) || {};

            if (!requestHeader.authToken) {

                return dispatch( onLogout() );

            }
    
            const { data } = await TPVAPI.get('/UnitsMeasure/GetUnitMeasures');

            dispatch( setUnitMeasuresList( data ) );

        } catch (ex) {

            const message = {
                title: 'Error al obtener las unidades de medida',
                text: `No fue posible obtener las unidades de medida, Error = ${ex.message}`,
                icon: 'error'
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
        // Methods
        startLoadingUnitMeasures,

        // Propierties
        unitMeasuresList,
    }

}