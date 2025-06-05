import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

const TPVAPI = axios.create({
    baseURL: VITE_API_URL,
});

TPVAPI.interceptors.request.use( config => {

    const user = JSON.parse(localStorage.getItem('currentUser')) || {};

    config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${user.authToken}`
    }

    return config;

});

export default TPVAPI;