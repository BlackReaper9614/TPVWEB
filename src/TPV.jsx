import { AppRouter } from './router/AppRouter';
import { BrowserRouter } from 'react-router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useState, useMemo } from 'react';

import { lighTheme, darkTheme } from './theme';
import { Provider } from 'react-redux';
import { store } from './store';

export const TPV = () => {

    const [isDarkMode, setIsDarkMode] = useState(true);

    const theme = useMemo(() => (isDarkMode ? darkTheme : lighTheme), [isDarkMode]);

    const toggleTheme = () => {

        setIsDarkMode((prev) => !prev);

    }

    return (

        <Provider store={store}>

            <BrowserRouter>

                <ThemeProvider theme={theme}>

                    <CssBaseline />

                    <AppRouter />

                </ThemeProvider>

            </BrowserRouter>

        </Provider>

    )

}