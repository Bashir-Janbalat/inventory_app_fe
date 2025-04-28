import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Category, LocalMall, Storefront } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SidebarMenu = () => {
    const navigate = useNavigate();

    const menuItems = [
        { text: 'Products', icon: <LocalMall />, path: '/products' },
        { text: 'Categories', icon: <Category />, path: '/categories' },
        { text: 'Brands', icon: <Storefront />, path: '/brands' },
        { text: 'Suppliers', icon: <Storefront />, path: '/suppliers' },
    ];

    return (
        <List>
            {menuItems.map((item, index) => (
                <ListItemButton
                    key={index}
                    onClick={() => navigate(item.path)}
                    sx={{
                        borderRadius: 2,
                        mx: 1,
                        my: 0.5,
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                    }}
                >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItemButton>
            ))}
        </List>
    );
};

export default SidebarMenu;
