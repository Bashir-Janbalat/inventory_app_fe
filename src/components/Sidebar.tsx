import React from 'react';
import {Drawer, useMediaQuery, useTheme} from '@mui/material';
import SidebarMenu from './SidebarMenu';

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
            anchor='top'
            variant={isMobile ? 'temporary' : 'persistent'}
        >
            <SidebarMenu toggleSidebar={toggleSidebar} />
        </Drawer>
    );
};

export default Sidebar;
