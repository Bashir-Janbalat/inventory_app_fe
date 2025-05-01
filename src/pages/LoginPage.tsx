import {useEffect} from 'react';
import {Container, Paper, Typography} from '@mui/material';
import {useLocation, useNavigate} from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm.tsx';
import {useAuth} from "../hooks/useAuth.ts";
import {removeToken} from "../auth/AuthUtils.ts";
import AutoHideAlert from "../components/common/AutoHideAlert.tsx";
import {MessageType} from "../types/MessageType.ts";

const LoginPage = () => {
        const navigate = useNavigate();
        const {authenticated} = useAuth();
        const location = useLocation();
        const {error: errorMessage, success: successMessage} = location.state || {};

        useEffect(() => {
                if (authenticated) {
                    navigate('/products');
                } else {
                    removeToken();
                }

            }, [authenticated, navigate]
        );

        return (
            <Container maxWidth="sm">
                <Paper
                    elevation={3}
                    sx={{
                        p: {xs: 2, sm: 4},
                        mt: {xs: 4, sm: 8},
                    }}
                >
                    <Typography variant="h4" align="center" gutterBottom>
                        Login
                    </Typography>
                    {successMessage && <AutoHideAlert message={errorMessage} type={MessageType.error}/>}
                    {successMessage && <AutoHideAlert message={successMessage} type={MessageType.success}/>}

                    <LoginForm/>
                </Paper>
            </Container>
        );
    }
;

export default LoginPage;
