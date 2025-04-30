import {useEffect} from 'react';
import {Container, Paper, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm.tsx';
import {useAuth} from "../hooks/useAuth.ts";
import {removeToken} from "../auth/AuthUtils.ts";

const LoginPage = () => {
        const navigate = useNavigate();
        const {authenticated} = useAuth();

        useEffect(() => {
                if (authenticated) {
                    navigate('/products');
                } else {
                    removeToken();
                }

            }, [authenticated, navigate]
        )
        ;

        return (
            <Container maxWidth="sm">
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 2, sm: 4 },
                        mt: { xs: 4, sm: 8 },
                    }}
                >
                    <Typography variant="h4" align="center" gutterBottom>
                        Login
                    </Typography>
                    <LoginForm/>
                </Paper>
            </Container>
        );
    }
;

export default LoginPage;
