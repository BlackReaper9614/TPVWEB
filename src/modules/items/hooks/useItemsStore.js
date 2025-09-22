import { useDispatch, useSelector } from 'react-redux';
import { onLogout, setAlertMessage, clearAlertMessage, setIsLoadingbar, setItems, onChangeItemStatus, setItemsListSize } from '../../../store';
import { TPVAPI } from "../../../apis";

export const useItemsStore = () => {

    const { items, itemsListSize, itemsListCurrentPage } = useSelector(state => state.items);

    const dispatch = useDispatch();

    const getItemsByUser = async () => {

        dispatch( setIsLoadingbar(true) );

        try {

            const requestHeader = JSON.parse(localStorage.getItem('currentUser')) || {};

            if (!requestHeader.authToken) {

                return dispatch( onLogout() );

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

                dispatch( setAlertMessage(message) );

                setTimeout(() => {

                    dispatch( clearAlertMessage() );

                }, 10);

            }

        } catch (ex) {

            const message = {
                title: 'Error al obtener los artículos',
                text: `No fue posible obtener los artículos, Error = ${ex.message}`,
                icon: 'warning'
            }

            dispatch( setAlertMessage( message ) );

            setTimeout( () => {

                dispatch( clearAlertMessage() );

            }, 10);

        } finally {

            dispatch( setIsLoadingbar(false));
            
        }

    }

    const changeItemStatus = async ( idItem, status) => {

        
        
        try {

            const idStatus = status ? 1 : 2;

            dispatch( setIsLoadingbar(true) );
            
            const requestHeader = JSON.parse(localStorage.getItem('currentUser')) || {};

            if (!requestHeader.authToken) {

                return dispatch( onLogout() );

            }

            const { data } = await TPVAPI.post(`/Items/ChangeItemStatus?idUser=${requestHeader.idUser}&idItem=${idItem}&idStatus=${idStatus}`);
            
            if(!data){

                const message = {
                    title: 'Error al cambiar el estatus del artículo',
                    text: `No fue posible cambiar el estatus del artículo, Error = ${ex.message}`,
                    icon: 'warning'
                }

                dispatch( setAlertMessage( message ) );

                setTimeout( () => {
    
                    dispatch( clearAlertMessage() );
    
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

            dispatch( setAlertMessage( message ) );

            setTimeout( () => {

                dispatch( clearAlertMessage() );

            }, 10);

        } finally {
            
            dispatch( setIsLoadingbar(false) );

        }

    }

    const startGetItemsByParams = async(searchParams) => {

        try {
            
            dispatch( setIsLoadingbar(true) );

            const requestHeader = JSON.parse(localStorage.getItem('currentUser')) || {};

            if (!requestHeader.authToken) {
                
                return dispatch( onLogout() );
                
            }

            searchParams.idUser = requestHeader.idUser;

            const { data } = await TPVAPI.post(`/Items/GetItemsByParams`, searchParams)

            if(data.length > 0){

                const totalPages = Math.ceil( parseInt(data[0].totalRows) / searchParams.pageSize )

                dispatch( setItemsListSize(totalPages) );

            }

            dispatch( setItems(data) );

        } catch (ex) {
            
            const message = {
                title: 'Error',
                text: `Error al obtener los artículos, Error = ${ex.message}`,
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
        //Methods
        getItemsByUser,
        changeItemStatus,
        startGetItemsByParams,

        //Propierties
        items,
        itemsListSize,
        itemsListCurrentPage,
    }

}
