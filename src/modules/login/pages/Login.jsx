import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { Backdrop, Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, LinearProgress, Link, OutlinedInput, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import WavingHandIcon from '@mui/icons-material/WavingHand';
import { useEffect, useState } from 'react';
import { useLoginStore } from '../hooks/useLoginStore';
import Swal from 'sweetalert2';
import { lightGreen } from '@mui/material/colors';

const providers = [{ id: 'credentials', name: 'Credentials' }];

const BRANDING = {
    logo: (

        <img
            src="https://mui.com/static/logo.svg"
            alt="MUI logo"
            style={{ height: 24 }}
        />

    ),
    title: 'Mi punto de venta online',
};

const CustomSubmitButton = () => {

    return (

        <Button
            type="submit"
            variant="outlined"
            color="info"
            size="small"
            disableElevation
            fullWidth
            sx={{ my: 2 }}
        >
            Ingresar
        </Button>

    );

}

const Title = () => {

    return (

        <h2 style={{ marginBottom: 8 }}>Mi punto de venta online</h2>

    )

};

const Subtitle = () => {

    return (

        <Box sx={{ textAlign: 'center', mb: 2, mt: 2 }}>

            <WavingHandIcon color="light" sx={{ mr: 1, fontSize: '1rem' }} />

            ingrese sus credenciales para continuar

        </Box>

    );

}

const CustomEmailField = () => {
    return (

        <TextField
            id="input-with-icon-textfield"
            label="Usuario/Email"
            name="email"
            type="email"
            size="small"
            required
            fullWidth
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle fontSize="inherit" />
                        </InputAdornment>
                    ),
                },
            }}
            variant="outlined"
        />

    );

}

const CustomPasswordField = () => {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (

        <FormControl sx={{ my: 2 }} fullWidth variant="outlined">

            <InputLabel size="small" htmlFor="outlined-adornment-password">
                Password
            </InputLabel>

            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                size="small"
                endAdornment={

                    <InputAdornment position="end">

                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="small"
                        >
                            {showPassword ? (
                                <VisibilityOff fontSize="inherit" />
                            ) : (
                                <Visibility fontSize="inherit" />
                            )}

                        </IconButton>

                    </InputAdornment>

                }
                label="Password"
            />

        </FormControl>

    );
}

const CustomRememberMe = () => {
    const theme = useTheme();

    return (

        <FormControlLabel
            label="Recordarme"
            control={

                <Checkbox
                    name="remember"
                    value="true"
                    color="primary"
                    sx={{ padding: 0.5, '& .MuiSvgIcon-root': { fontSize: 20 } }}
                />

            }
            slotProps={{
                typography: {
                    color: 'textSecondary',
                    fontSize: theme.typography.pxToRem(14),
                },
            }}
        />

    );

}

const ForgotPasswordLink = () => {

    return (

        <Link href="/" variant="body2">
            Olvidé mi contraseña
        </Link>

    );

}

export const Login = () => {

    const { startLogin, message, isLoading } = useLoginStore();

    const signIn = (provider, formData) => {

        const userName = formData.get('email');

        const userPassword = formData.get('password');

        startLogin(userName, userPassword);

    };

    useEffect(() => {
      
        if(message !== undefined)
        {

            Swal.fire(`${message.title}`, `${message.text}`, `${message.icon}`)

        }

    }, [ message ]);
    
    return (

        <>

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={isLoading}
            >
                <CircularProgress color="inherit" />

            </Backdrop>

            <AppProvider branding={BRANDING} >

                <SignInPage
                    signIn={signIn}
                    providers={providers}
                    slots={{
                        title: Title,
                        subtitle: Subtitle,
                        emailField: CustomEmailField,
                        passwordField: CustomPasswordField,
                        rememberMe: CustomRememberMe,
                        submitButton: CustomSubmitButton,
                        forgotPasswordLink: ForgotPasswordLink
                    }}
                    slotProps={{
                        form: { noValidate: true },
                        submitButton: {
                            color: 'primary',
                            variant: 'contained',
                        },
                    }}
                />

            </AppProvider>

        </>
    );

}