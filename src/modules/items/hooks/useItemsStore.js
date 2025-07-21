import { useDispatch, useSelector } from 'react-redux';
import { onChangeItemStatus, setItems } from '../../../store/items/itemsSlice';
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

    const changeItemStatus = async ( idItem, status) => {

        const idStatus = status ? 1 : 2;

        dispatch( onChecking() );

        try {
            
            const requestHeader = JSON.parse(localStorage.getItem('currentUser')) || {};

            if (!requestHeader.authToken) {

                return dispatch(onLogout());

            }

            const { data } = await TPVAPI.post(`/Items/ChangeItemStatus?idUser=${requestHeader.idUser}&idItem=${idItem}&idStatus=${idStatus}`);
            
            if(!data){

                const message = {
                    title: 'Error al cambiar el estatus del artículo',
                    text: `No fue posible cambiar el estatus del artículo, Error = ${ex.message}`,
                    icon: 'warning'
                }

                dispatch( setMessage( message ) );

                setTimeout( () => {
    
                    dispatch( clearMessage() );
    
                }, 10);

            }else{

                dispatch( onChangeItemStatus({ idItem, idStatus}) );

            }

        } catch (ex) {
         
            const message = {
                title: 'Error al cambiar el estatus del artículo',
                text: `No fue posible cambiar el estatus del artículo, favor de intentalor más tarde, error = ${ex.message}`,
                icon: 'error'
            }

            dispatch( setMessage( message ) );

            setTimeout( () => {

                dispatch( clearMessage() );

            }, 10);

        }

        dispatch( onChecked() );

    }

    return {
        //Methods
        getItemsByUser,
        changeItemStatus,

        //Propierties
        items
    }

}
