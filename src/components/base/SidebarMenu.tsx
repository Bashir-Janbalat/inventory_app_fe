import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CategoryIcon from '@mui/icons-material/Category';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import {useNavigate} from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TimelineIcon from '@mui/icons-material/Timeline';

type SidebarMenuProps = {
    toggleSidebar: () => void;
};

const SidebarMenu = ({ toggleSidebar }: SidebarMenuProps) => {
    const navigate = useNavigate();

    const menuItems = [
        { text: 'Purchases', icon: <ShoppingCartIcon fontSize="large" />, path: '/purchases' },
        { text: 'Products', icon: <LocalMallIcon fontSize="large" />, path: '/products' },
        { text: 'Categories', icon: <CategoryIcon fontSize="large" />, path: '/categories' },
        { text: 'Brands', icon: <StorefrontIcon fontSize="large" />, path: '/brands' },
        { text: 'Suppliers', icon: <PermIdentityIcon fontSize="large" />, path: '/suppliers' },
        { text: 'Warehouses', icon: <WarehouseIcon fontSize="large" />, path: '/warehouses' },
        { text: 'Movements', icon: <TimelineIcon fontSize="large" />, path: '/stockmovement' },
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
                                flexDirection: 'column',
                                py: 2,
                            }}
                        >
                            <ListItemIcon
                                color="primary"
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
                                    <Typography
                                        color="primary"
                                        align="center"
                                        variant="body1"
                                        sx={{ fontWeight: 600, fontFamily: 'Roboto, sans-serif' }}
                                    >
                                        {item.text}
                                    </Typography>
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
