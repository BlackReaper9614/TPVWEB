import { useDispatch, useSelector } from 'react-redux';
import { onChecking, onChecked, onLogin,  onLogout, clearMessage } from '../../../store/index';
import { TPVAPI } from '../../../apis';

export const useLoginStore = () => {

    const { status, user, message, isLoading, selectedBranch, selectedModule } = useSelector(state => state.login);

    const dispatch = useDispatch();

    const startLogin = async ( user, password ) => {

        dispatch( onChecking() );

        try {

            const requestHeader = {
                userName: user,
                userPassword: password
            }

            const { data } = await TPVAPI.post('/Login/Auth', requestHeader );

            dispatch( onLogin(data) );

            localStorage.setItem('currentUser', JSON.stringify(data) );

            dispatch( onChecked() );

        } catch (ex) {
            
            localStorage.clear();

            const message = {
                title: 'Error de autenticación',
                text: `Credenciales no validas, Error = ${ex.message}`,
                icon: 'warning'
            }

            dispatch( onChecked() );

            console.log('Entro a este log')

            dispatch( onLogout( message ) );

            setTimeout( () => {

                dispatch( clearMessage() )

            }, 10); 

        }

    }

    const checkAuthUser = async () => {

        try {
            
            const requestHeader = JSON.parse( localStorage.getItem('currentUser')) || {};

            if(!requestHeader.authToken){

                return dispatch( onLogout() );

            }

            const { data } = await TPVAPI.post('/Login/RenewToken', requestHeader );

            dispatch( onLogin( data ) );

            localStorage.setItem('currentUser', JSON.stringify(data) );

        } catch (ex) {
            
            localStorage.clear();

            const message = {
                title: 'Error de autenticación',
                text: `La sesión caduco, favor de iniciar sesión de nuevo, Error = ${ex.message}`,
                icon: 'warning'
            }

            dispatch( onLogout( message ) );

            setTimeout( () => {

                dispatch( clearMessage() );

            }, 10);

        }

    }

    const startCleanMessage = async () => {

        dispatch( clearMessage() );

    }

    return{
        //Propierties
        status,
        user,
        message,
        isLoading,
        selectedBranch,

        //Methods
        startLogin,
        checkAuthUser,
        startCleanMessage,
    }

}