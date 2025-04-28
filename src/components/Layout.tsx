import React, {useState} from 'react';
import {Box, Container} from '@mui/material';
import {Outlet} from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

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
                        flexGrow: 1,
                        p: 4, // Padding
                        marginLeft: sidebarOpen ? '250px' : '0',
                        transition: 'margin 0.3s',
                    }}
                >
                    <Outlet/>
                </Container>
            </Box>

            {/* Footer unten */}
            <Footer/>
        </Box>
    );
};

export default Layout;