import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { Stack} from '@mui/material';
import { MasterRoutes } from '../components/MasterRoutes';
import { useModulesStore } from '../../modules/modules/hooks/useModulesStore';
import { useEffect } from 'react';

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

    const { startGetModules, modules } = useModulesStore();

    useEffect(() => {
    
        startGetModules();

    }, []);
    
    const router = useDemoRouter('/home');

    const newModules = modules.map(item => {

        return {
            segment: `/${item.moduleURL}`,
            title: item.moduleName,
            icon: <DescriptionIcon />
        }

    })

    return (

        <AppProvider
            // navigation={[
            //     {
            //         segment: 'home',
            //         title: 'Home',
            //         icon: <DescriptionIcon />,
            //     },
            //     {
            //         segment: 'about',
            //         title: 'About Us',
            //         icon: <DescriptionIcon />,
            //     },
            // ]}

            navigation={newModules}

            router={router}
            theme={demoTheme}
        // window={demoWindow}
        >
            <DashboardLayout 
                slots={{
                    appTitle: CustomAppTitle
                }}
            >

                <MasterRoutes modules={ modules } />

                {/* <DemoPageContent pathname={router.pathname} /> */}

            </DashboardLayout>

        </AppProvider>

    );
}