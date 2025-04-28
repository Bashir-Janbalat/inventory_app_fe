import React from 'react';
import {Drawer, useMediaQuery, useTheme} from '@mui/material';
import SidebarMenu from './SidebarMenu'; // Hier wird die Liste importiert

interface SidebarProps {
    open: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggleSidebar }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Drawer
            open={open}
            onClose={toggleSidebar}
            variant={isMobile ? 'temporary' : 'persistent'}
            anchor="left"
            sx={{
                width: 250,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 250,
                    boxSizing: 'border-box',
                    marginTop: '70px', // Platz für Header
                    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)',
                    backgroundColor: (theme) => theme.palette.background.paper,
                },
            }}
        >
            <SidebarMenu /> {/* Die Liste wird hier angezeigt */}
        </Drawer>
    );
};

export default Sidebar;
