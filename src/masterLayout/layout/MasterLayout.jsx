import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Outlet, useNavigate } from 'react-router-dom';
import { Backdrop, CircularProgress, Stack } from '@mui/material';
import { useModulesStore } from '../../modules/modules/hooks/useModulesStore';
import Box from '@mui/material/Box';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Suspense } from 'react';
import { useLoginStore } from '../../modules/login/hooks/useLoginStore';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

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

    const { isLoading, message } = useLoginStore();

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
                navigate(`/${normalizedPath}/\*`);
            }

        }

    });

    useEffect(() => {

        if (message !== undefined) {

            Swal.fire(`${message.title}`, `${message.text}`, `${message.icon}`)

        }

    }, [message]);

    return (

        <div className="content-area">

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={isLoading}
            >
                <CircularProgress color="inherit" />

            </Backdrop>

            {/* Asegúrate que el Outlet esté en el área de contenido principal */}
            <Suspense fallback={<div>XD</div>}>

                <AppProvider navigation={newModules} >

                    <DashboardLayout slots={{ appTitle: CustomAppTitle }}>

                        <Outlet /> {/* Esto renderizará Ventas, Artículos, etc. */}

                    </DashboardLayout>

                </AppProvider>

            </Suspense>

        </div>

    );

}