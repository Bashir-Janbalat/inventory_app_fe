import {useEffect} from 'react';
import {Container, Paper, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import {useAuth} from "../auth/AuthContext.tsx";
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
                <Paper elevation={3} sx={{padding: 4, marginTop: 8}}>
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
