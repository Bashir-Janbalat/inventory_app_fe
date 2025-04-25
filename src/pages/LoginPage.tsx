import {useEffect} from 'react';
import {Container, Paper, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {getToken, isTokenExpired, removeToken} from '../auth/Auth.ts';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (token == null || isTokenExpired(token)) {
            removeToken();
            navigate('/login');
        } else {
            navigate('/products');
        }
    }, [navigate]);

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <LoginForm />
            </Paper>
        </Container>
    );
};

export default LoginPage;
