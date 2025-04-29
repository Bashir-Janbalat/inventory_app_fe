import React from "react";
import {AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {Brightness4, Brightness7} from "@mui/icons-material";
import {useAuth} from "../auth/UseAuth.ts";


interface HeaderProps {
    darkMode: boolean;
    setDarkMode: (mode: boolean) => void;
    toggleSidebar: (openOrClose?: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({darkMode, setDarkMode, toggleSidebar}) => {
    const navigate = useNavigate();
    const {authenticated: isAuthenticated, subject: username, logout} = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
        toggleSidebar(false);
    };

    return (
        <AppBar position="fixed" sx={{backgroundColor: darkMode ? "#333" : "#f5f7fa", boxShadow: 4, mb: 4}}>
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: {xs: "wrap", sm: "nowrap"}, // على الموبايل: العناصر تلتف للأسفل
                    gap: 2, // مسافة بين العناصر عند الالتفاف
                }}
            >
                {/* Left Side: Logo */}
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        color: darkMode ? "white" : "primary.main",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: {xs: "1.2rem", sm: "1.7rem"}, // أصغر على الموبايل
                        letterSpacing: 1.5,
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                        textAlign: {xs: "center", sm: "left"}, // وسط في الموبايل
                        width: {xs: "100%", sm: "auto"},
                        display: {xs: 'none', sm: 'none', md: 'block'}
                    }}
                >
                    Inventory Management System
                </Typography>

                {/* Right Side: Buttons + Divider + Username */}
                <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                    <IconButton color="primary" onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? <Brightness7/> : <Brightness4/>}
                    </IconButton>

                    {isAuthenticated && (
                        <>
                            {/* Buttons Section */}
                            <Box sx={{display: "flex", gap: 1}}>
                                <Button variant="outlined" color="primary" onClick={() => toggleSidebar()}
                                        sx={{fontWeight: "bold", boxShadow: 2}}>
                                    Dashboard
                                </Button>
                                <Button variant="outlined" color="primary" component={Link} to="/products"
                                        sx={{fontWeight: "bold", boxShadow: 2}}>
                                    Products
                                </Button>
                                <Button variant="contained" color="error" onClick={handleLogout}
                                        sx={{fontWeight: "bold", boxShadow: 2}}>
                                    Logout
                                </Button>
                            </Box>

                            {/* Divider */}
                            <Box sx={{
                                width: 1,
                                height: 35,
                                borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                                mx: 2
                            }}/>

                            {/* Username + Avatar */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: {xs: 1, sm: 2},
                                    flexDirection: {xs: "column", sm: "row"}, // على موبايل: عمودي، على لابتوب: أفقي
                                    width: {xs: "100%", sm: "auto"}, // يجعل البوكس يأخذ عرض كامل على الموبايل
                                }}
                            >
                                <Avatar sx={{width: 35, height: 35, bgcolor: "primary.main"}}>
                                    {username ? username.charAt(0).toUpperCase() : "U"}
                                </Avatar>
                                <Typography variant="subtitle2"
                                            sx={{fontWeight: "bold", color: "text.primary", fontSize: "1rem"}}>
                                    {username}
                                </Typography>
                            </Box>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
