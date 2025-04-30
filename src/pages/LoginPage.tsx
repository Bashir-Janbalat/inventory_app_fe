import {useEffect} from 'react';
import {Alert, Container, Paper, Typography} from '@mui/material';
import {useLocation, useNavigate} from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm.tsx';
import {useAuth} from "../hooks/useAuth.ts";
import {removeToken} from "../auth/AuthUtils.ts";
import SuccessMessage from "../components/common/SuccessMessage.tsx";

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
                    {errorMessage && (
                        <Alert severity="error" sx={{mb: 2}}>
                            {errorMessage}
                        </Alert>
                    )}
                    {successMessage && <SuccessMessage message={successMessage}/>}

                    <LoginForm/>
                </Paper>
            </Container>
        );
    }
;

export default LoginPage;
