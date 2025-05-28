import React from 'react';
import {Container} from '@mui/material';
import {Outlet} from 'react-router-dom';

const LoginLayout: React.FC = () => {
    return (
        <Container
            sx={{
                py: 4,
                pt: {xs: '80px', sm: '80px'},
                minHeight: '100vh',
                overflow: 'auto',
                height: '100%',
                flex: 1,
            }}
        >
            <Outlet/>
        </Container>
    );
};

export default LoginLayout;