import {useState} from 'react';
import {Alert, Box, Button, TextField, Typography} from '@mui/material';
import {login} from '../api/AuthApi.tsx';
import {Link, useNavigate} from 'react-router-dom';
import {saveToken} from '../auth/Auth.ts';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            saveToken(response.accessToken);
            navigate('/products');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 2}}>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
                label="Username"
                type="text"
                fullWidth
                margin="normal"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{mt: 2}}
            >
                Login
            </Button>
            <Typography variant="body2" align="center" sx={{mt: 2}}>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </Typography>
        </Box>
    );
};

export default LoginForm;
