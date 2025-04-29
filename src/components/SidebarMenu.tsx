import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CategoryIcon from '@mui/icons-material/Category';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import {useNavigate} from 'react-router-dom';

type SidebarMenuProps = {
    toggleSidebar: () => void;
};

const SidebarMenu = ({toggleSidebar}: SidebarMenuProps) => {
    const navigate = useNavigate();

    const menuItems = [
        {text: 'Products', icon: <LocalMallIcon fontSize="large"/>, path: '/products'},
        {text: 'Categories', icon: <CategoryIcon fontSize="large"/>, path: '/categories'},
        {text: 'Brands', icon: <StorefrontIcon fontSize="large"/>, path: '/brands'},
        {text: 'Suppliers', icon: <PermIdentityIcon fontSize="large"/>, path: '/suppliers'},
    ];

    function handleClick(path: string): void {
        navigate(path);
        toggleSidebar();
    }

    return (
        <Box width="100%">
            <List>
                {menuItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            onClick={() => handleClick(item.path)}
                            sx={{
                                width: '100%',
                                flexDirection: 'column', // Stack icon and text vertically
                                py: 2, // vertical padding
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                    minWidth: 0,
                                    mb: 1,
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography align="center" variant="body1">{item.text}</Typography>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default SidebarMenu;
