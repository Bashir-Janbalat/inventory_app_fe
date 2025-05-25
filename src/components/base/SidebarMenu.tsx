import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CategoryIcon from '@mui/icons-material/Category';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import {useNavigate} from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TimelineIcon from '@mui/icons-material/Timeline';
import PeopleIcon from '@mui/icons-material/People';
import {useAuth} from "../../hooks/useAuth.ts";

type SidebarMenuProps = {
    toggleSidebar: () => void;
};

const SidebarMenu = ({toggleSidebar}: SidebarMenuProps) => {
    const navigate = useNavigate();
    const {roles} = useAuth();
    const isUserView = roles?.includes("ROLE_USER_VIEW");

    const menuItems = [
        {text: 'Purchases', icon: <ShoppingCartIcon fontSize="medium"/>, path: '/purchases'},
        {text: 'Products', icon: <LocalMallIcon fontSize="medium"/>, path: '/products'},
        {text: 'Categories', icon: <CategoryIcon fontSize="medium"/>, path: '/categories'},
        {text: 'Brands', icon: <StorefrontIcon fontSize="medium"/>, path: '/brands'},
        {text: 'Suppliers', icon: <PermIdentityIcon fontSize="medium"/>, path: '/suppliers'},
        {text: 'Warehouses', icon: <WarehouseIcon fontSize="medium"/>, path: '/warehouses'},
        {text: 'Movements', icon: <TimelineIcon fontSize="medium"/>, path: '/stockmovement'},
        ...(
            isUserView
                ? [{text: 'Users', icon: <PeopleIcon fontSize="medium"/>, path: '/userManagement'}]
                : []
        )
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
                                        sx={{fontWeight: 600, fontFamily: 'Roboto, sans-serif'}}
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
