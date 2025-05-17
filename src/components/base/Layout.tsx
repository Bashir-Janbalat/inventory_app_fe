import React, {useState} from 'react';
import {Box, Container, Typography} from '@mui/material';
import {Outlet} from 'react-router-dom';
import Header from './Header.tsx';
import Sidebar from './Sidebar.tsx';
import Footer from './Footer.tsx';

interface LayoutProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({darkMode, setDarkMode}) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);


    const toggleSidebar = (openOrClose?: boolean) => {
        if (openOrClose !== undefined) {
            setSidebarOpen(openOrClose);
        } else {
            setSidebarOpen((prev: boolean) => !prev);
        }
    }

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header darkMode={darkMode} setDarkMode={setDarkMode} toggleSidebar={toggleSidebar}/>

            <Box display="flex" flex={1}>
                <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar}/>
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
                <Box sx={{
                    width: {xs: '0px', md: '250px'},
                    display: {xs: 'none', md: 'block'},
                    borderLeft: '1px solid #ccc',
                    p: 2,
                    backgroundColor: 'background.paper',
                }}>
                    <Typography variant="h6">لوحة جانبية</Typography>
                    <Box>
                        <p>محتوى إضافي</p>
                    </Box>
                </Box>
            </Box>
            {/* Footer unten */}
            <Footer/>
        </Box>
    );
};

export default Layout;