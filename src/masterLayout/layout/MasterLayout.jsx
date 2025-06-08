import { AppProvider } from '@toolpad/core/AppProvider';
import { createTheme } from '@mui/material/styles';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Outlet, useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useModulesStore } from '../../modules/modules/hooks/useModulesStore';
import Box from '@mui/material/Box';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Suspense } from 'react';

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

const DemoPageContent = ({ pathname }) => {

    return (

        <Box
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >

            <Typography>Dashboard content for {pathname}</Typography>

        </Box>

    );

};

DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

const CustomAppTitle = () => (

    <Stack direction="row" alignItems="center" spacing={2}>

        <CloudCircleIcon fontSize="large" color="primary" />

        <Typography variant="h6">Mi punto de venta online</Typography>

    </Stack>

);

export const MasterLayout = (props) => {

    const navigate = useNavigate();

    const { modules } = useModulesStore();

    const newModules = modules.map(item => {

        return {
            segment: item.moduleURL.startsWith('/') ? item.moduleURL.substring(1) : item.moduleURL,
            title: item.moduleName,
            icon: <DescriptionIcon />,
            onclick: () => {
                // Navegación controlada por React Router
                const normalizedPath = item.moduleURL.replace(/^\/+/, '');
                navigate(`/${normalizedPath}`);
            }
            
        }

    })

    return (

        <AppProvider navigation={newModules} theme={demoTheme}>

            <DashboardLayout slots={{ appTitle: CustomAppTitle }}>

                {/* Asegúrate que el Outlet esté en el área de contenido principal */}
                <div className="content-area">

                    <Suspense fallback={<div>XD</div>}>

                        <Outlet /> {/* Esto renderizará Ventas, Artículos, etc. */}

                    </Suspense>

                </div>

            </DashboardLayout>

        </AppProvider>

    );

}