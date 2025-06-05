import { createTheme } from '@mui/material/styles';

export const lighTheme = createTheme({
    palette: {
        mode: 'light',
        // primary: {
        //     main: '#1976d2', // Azul MUI por defecto
        // },
        // secondary: {
        //     main: '#dc004e', // Rosa MUI por defecto
        // },
        // background: {
        //     default: '#f5f5f5', // Fondo claro
        //     paper: '#ffffff',   // Superficies (cards, dialogs)
        // },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        // primary: {
        //     main: '#90caf9', // Azul claro para contraste
        // },
        // secondary: {
        //     main: '#f48fb1', // Rosa claro
        // },
        // background: {
        //     default: '#121212', // Fondo oscuro
        //     paper: '#1e1e1e',   // Superficies oscuras
        // },
    },
});