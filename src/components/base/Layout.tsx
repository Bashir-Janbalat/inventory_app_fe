import React, {useEffect, useRef, useState} from 'react';
import {Box, Container} from '@mui/material';
import {Outlet} from 'react-router-dom';
import Header from './Header.tsx';
import Sidebar from './Sidebar.tsx';
import Footer from './Footer.tsx';
import { Timeout } from 'react-number-format/types/types';

interface LayoutProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({darkMode, setDarkMode}) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const timeoutRef = useRef<Timeout | null>(null);

    useEffect(() => {
        if (sidebarOpen) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setSidebarOpen(false);
            }, 5000);
        }
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [sidebarOpen]);


    const toggleSidebar = (openOrClose?: boolean) => {
        if (openOrClose !== undefined) {
            setSidebarOpen(openOrClose);
        } else {
            setSidebarOpen((prev: boolean) => !prev);
        }
    }

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh" >
            <Header darkMode={darkMode} setDarkMode={setDarkMode} toggleSidebar={toggleSidebar}/>

            <Box display="flex" flex={1}>

                <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
                <Container sx={{ py: 4,pt: { xs: '80px', sm: '80px' },minHeight: '100vh',overflow: 'auto', height: '100%' }}>
                    <Outlet/>
                </Container>
            </Box>

            {/* Footer unten */}
            <Footer/>
        </Box>
    );
};

export default Layout;