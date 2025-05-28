import React from 'react';
import {Drawer, useMediaQuery, useTheme} from '@mui/material';
import SidebarMenu from './SidebarMenu.tsx';

interface SidebarProps {
    open: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({open, toggleSidebar}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Drawer
            open={open}
            onClose={toggleSidebar}
            anchor={isMobile ? 'top' :'left'}
            variant={isMobile ? 'temporary' : 'persistent'}
            sx={{
                '& .MuiDrawer-paper': {
                    top: '65px',
                    height: 'calc(100% - 64px)',
                    boxShadow: '1px 1px 1px 1px #000000',
                },
            }}
        >
            <SidebarMenu toggleSidebar={toggleSidebar} />

        </Drawer>
    );
};

export default Sidebar;
