import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../../../store/items/itemsSlice';
import { onChecking, onChecked, onLogout, setMessage, clearMessage } from '../../../store/login/loginSlice';
import { TPVAPI } from "../../../apis";

export const useItemsStore = () => {

    const { items } = useSelector(state => state.items);

    const dispatch = useDispatch();

    const getItemsByUser = async () => {

        dispatch(onChecking());

        try {

            const requestHeader = JSON.parse(localStorage.getItem('currentUser')) || {};

            if (!requestHeader.authToken) {

                return dispatch(onLogout());

            }

            const { data } = await TPVAPI.get(`/Items/GetItemsByUser?idUser=${requestHeader.idUser}`)

            if (data != null && data.length > 0) {

                dispatch( setItems(data) );

            } else {

                const message = {
                    title: 'Error al obtener los modulos',
                    text: `No se obtuvieron modulos, es posible que el usuario no tenga módulos asignados`,
                    icon: 'warning'
                }

                dispatch(setMessage(message));

                setTimeout(() => {

                    dispatch(clearMessage());

                }, 10);

            }

        } catch (ex) {

            const message = {
                title: 'Error al obtener los artículos',
                text: `No fue posible obtener los artículos, Error = ${ex.message}`,
                icon: 'warning'
            }

            dispatch( setMessage( message ) );

            setTimeout( () => {

                dispatch( clearMessage() );

            }, 10);

        }

        dispatch(onChecked());

    }

    return {
        //Methods
        getItemsByUser,

        //Propierties
        items
    }

}
