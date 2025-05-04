import React, { useState } from "react";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material";
import { Link } from "react-router-dom";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useAuth } from "../../hooks/useAuth.ts";

interface HeaderProps {
    darkMode: boolean;
    setDarkMode: (mode: boolean) => void;
    toggleSidebar: (openOrClose?: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode, toggleSidebar }) => {
    const { authenticated: isAuthenticated, subject: username, logout } = useAuth();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSettings = () => {
        handleMenuClose();
        // Hier könntest du z.B. navigate("/settings") einbauen
    };

    const handleLogout = () => {
        logout(false, "You have been successfully logged out");
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: darkMode ? "#333" : "#f5f7fa", boxShadow: 4, mb: 4 }}>
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    [theme.breakpoints.down("xs")]: {
                        flexDirection: "row",
                    },
                }}
            >
                {/* Left Side: Logo */}
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            color: darkMode ? "white" : "primary.main",
                            textDecoration: "none",
                            fontWeight: "bold",
                            fontSize: { xs: "1.0rem", sm: "1.2rem", md: "1.5rem" },
                            letterSpacing: 1.2,
                            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
                            textAlign: "left",
                            width: "auto",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: { xs: "none", sm: "none", md: "block" }
                        }}
                    >
                        Inventory Management System
                    </Typography>
                </Box>

                {/* Right Side: Dark Mode + Buttons + Avatar + Dropdown */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {/* Dark Mode Button */}
                    <IconButton color="primary" onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>

                    {/* Authenticated User - Buttons */}
                    {isAuthenticated && (
                        <>
                            {/* Buttons for Dashboard, Products, Logout */}
                            <Box sx={{ display: "flex", gap: 1, [theme.breakpoints.down("xs")]: { display: "none" } }}>
                                <Button variant="outlined" color="primary" onClick={() => toggleSidebar()} sx={{ fontWeight: "bold" }}>
                                    Dashboard
                                </Button>
                                <Button variant="outlined" color="primary" component={Link} to="/products" sx={{ fontWeight: "bold" }}>
                                    Products
                                </Button>
                                <Button variant="contained" color="error" onClick={handleLogout} sx={{ fontWeight: "bold" }}>
                                    Logout
                                </Button>
                            </Box>

                            {/* Divider */}
                            <Box sx={{ display: { xs: "none", sm: "block" }, width: 1, height: 35, borderLeft: "1px solid rgba(255, 255, 255, 0.5)", mx: 2 }} />

                            {/* Avatar + Username (Dropdown) */}
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                {/* Avatar icon, always visible */}
                                <IconButton onClick={handleAvatarClick} size="small" sx={{ p: 0 }}>
                                    <Avatar sx={{ width: 35, height: 35, bgcolor: theme.palette.primary.main }}>
                                        {username ? username.charAt(0).toUpperCase() : "U"}
                                    </Avatar>
                                </IconButton>

                                {/* Username only on larger screens */}
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: "bold",
                                        color: theme.palette.text.primary,
                                        fontSize: "1rem",
                                        ml: 1,
                                        display: { xs: "none", sm: "none", md: "block" },
                                    }}
                                >
                                    {username}
                                </Typography>
                            </Box>

                            {/* Dropdown Menu */}
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMenuClose}
                                sx={{
                                    mt: 1.5,
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    "&:before": {
                                        content: '""',
                                        display: "block",
                                        position: "absolute",
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: "background.paper",
                                        transform: "translateY(-50%) rotate(45deg)",
                                        zIndex: 0,
                                    },
                                }}
                                transformOrigin={{ horizontal: "right", vertical: "top" }}
                                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                            >
                                <MenuItem onClick={handleSettings}>Settings</MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
