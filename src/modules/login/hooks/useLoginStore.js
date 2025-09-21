import { useDispatch, useSelector } from 'react-redux';
import { clearAlertMessage, onLogin,  onLogout, setAlertMessage, setIsLoadingbar } from '../../../store/index';
import { TPVAPI } from '../../../apis';

export const useLoginStore = () => {

    const { status, user, selectedBranch } = useSelector(state => state.login);

    const { message } = useSelector(state => state.alertMessage);

    const { isLoading } = useSelector(state => state.loadingbar);

    const dispatch = useDispatch();

    const startLogin = async ( user, password ) => {

        try {

            dispatch( setIsLoadingbar(true) );

            const requestHeader = {
                userName: user,
                userPassword: password
            }

            const { data } = await TPVAPI.post('/Login/Auth', requestHeader );

            dispatch( onLogin(data) );

            localStorage.setItem('currentUser', JSON.stringify(data) );

        } catch (ex) {
            
            localStorage.clear();

            const message = {
                title: 'Error de autenticación',
                text: `Las credenciales no son validas, Error = ${ex.message}`,
                icon: 'warning'
            }

            dispatch( setAlertMessage( message ) );

            setTimeout( () => {

                dispatch( clearAlertMessage() )

            }, 10); 

        } finally {

            dispatch( setIsLoadingbar(false) );

        }

    }

    const checkAuthUser = async () => {

        try {
            
            const requestHeader = JSON.parse( localStorage.getItem('currentUser')) || {};

            if(!requestHeader.authToken){

                // Se hace solo el logout, ya que nunca existio sesión
                dispatch( onLogout() );

            }

            const { data } = await TPVAPI.post('/Login/RenewToken', requestHeader );

            dispatch( onLogin( data ) );

            localStorage.setItem('currentUser', JSON.stringify(data) );

        } catch (ex) {
            
            dispatch( onLogout() );
            
            localStorage.clear();

            const message = {
                title: 'Error de autenticación',
                text: `La sesión caduco, favor de iniciar sesión de nuevo, Error = ${ex.message}`,
                icon: 'warning'
            }

            dispatch( setAlertMessage( message ) );

            setTimeout( () => {

                dispatch( clearMessage() );

            }, 10);

        } finally {

            dispatch( setIsLoadingbar(false) );

        }

    }

    return{
        //Propierties
        status,
        user,
        message,
        selectedBranch,
        isLoading,

        //Methods
        startLogin,
        checkAuthUser,
    }

}