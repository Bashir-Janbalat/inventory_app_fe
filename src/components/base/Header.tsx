import React, {useState} from "react";
import {AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography, useTheme,} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {Brightness4, Brightness7} from "@mui/icons-material";
import {useAuth} from "../../hooks/useAuth.ts";
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';

interface HeaderProps {
    darkMode: boolean;
    setDarkMode: (mode: boolean) => void;
    toggleSidebar: (openOrClose?: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({darkMode, setDarkMode, toggleSidebar}) => {
    const {authenticated: isAuthenticated, roles, subject: username, logout} = useAuth();
    const isDeveloper = roles?.includes('ROLE_DEVELOPER');
    const theme = useTheme();
    const navigate = useNavigate();
    const buttonStyle = {
        width: 140,
        textTransform: "none",
        display: "inline-flex",
        justifyContent: "center",
        px: 2,
        fontWeight: 600,
        fontSize: "0.95rem",
        fontFamily: "Roboto, sans-serif",
    };

    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [avatarAnchorEl, setAvatarAnchorEl] = useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(menuAnchorEl);
    const isAvatarMenuOpen = Boolean(avatarAnchorEl);

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAvatarAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
        setAvatarAnchorEl(null);
    };

    const handleMyProfile = () => {
        navigate("/profile");
        handleMenuClose();
    };
    const handleServerErrorLogs = () => {
        navigate("/errorLogs");
        handleMenuClose();
    };

    const handleLogout = () => {
        logout(false, "You have been successfully logged out");
        handleMenuClose();
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                boxShadow: '1px 1px 1px 1px #000000',
                backgroundColor: darkMode ? "#333" : "#f5f7fa",
                mb: 4
            }}
        >
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
                <Box sx={{display: "flex", alignItems: "center", flexGrow: 1}}>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            color: darkMode ? "white" : "primary.main",
                            textDecoration: "none",
                            fontWeight: "bold",
                            fontSize: {xs: "1.0rem", sm: "1.2rem", md: "1.5rem"},
                            letterSpacing: 1.2,
                            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
                            textAlign: "left",
                            width: "auto",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: {xs: "none", sm: "none", md: "block"}
                        }}
                    >
                        Inventory Management System
                    </Typography>
                </Box>

                {/* Right Side: Dark Mode + Buttons + Avatar + Dropdown */}
                <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                    {/* Dark Mode Button */}
                    <IconButton color="primary" onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? <Brightness7/> : <Brightness4/>}
                    </IconButton>

                    {isAuthenticated && (
                        <>
                            {/* For medium and large screens: show buttons normally */}
                            <Box sx={{display: {xs: "none", md: "flex"}, gap: 1}}>
                                <Button startIcon={<MenuIcon/>} variant="outlined" color="primary"
                                        onClick={() => toggleSidebar()} sx={buttonStyle}>
                                    Menu
                                </Button>
                                <Button startIcon={<DashboardIcon/>} variant="outlined" color="primary" component={Link}
                                        to="/dashboard" sx={buttonStyle}>
                                    Dashboard
                                </Button>
                                <Button startIcon={<LogoutIcon/>} variant="contained" color="error"
                                        onClick={handleLogout} sx={buttonStyle}>
                                    Logout
                                </Button>
                            </Box>

                            {/* For small screens: show as dropdown menu */}
                            <Box sx={{display: {xs: "block", md: "none"}}}>
                                <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
                                    <Typography sx={{fontWeight: "bold"}}>☰</Typography>
                                </IconButton>
                                <Menu
                                    anchorEl={menuAnchorEl}
                                    open={isMenuOpen}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={() => {
                                        toggleSidebar();
                                        handleMenuClose();
                                    }}>Menu</MenuItem>
                                    <MenuItem onClick={() => {
                                        toggleSidebar();
                                        handleMenuClose();
                                    }}>Dashboard</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </Box>

                            {/* Divider */}
                            <Box
                                sx={{
                                    display: {xs: "none", sm: "block"},
                                    width: 1,
                                    height: 35,
                                    borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
                                    mx: 2
                                }}
                            />

                            {/* Avatar + Username (Dropdown) */}
                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <IconButton onClick={handleAvatarClick} size="small" sx={{p: 0}}>
                                    <Avatar sx={{width: 35, height: 35, bgcolor: theme.palette.primary.main}}>
                                        {username ? username.charAt(0).toUpperCase() : "U"}
                                    </Avatar>
                                </IconButton>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: "bold",
                                        color: theme.palette.text.primary,
                                        fontSize: "1rem",
                                        ml: 1,
                                        display: {xs: "none", sm: "none", md: "block"},
                                    }}
                                >
                                    {username}
                                </Typography>
                            </Box>

                            {/* Avatar Dropdown Menu */}
                            <Menu
                                anchorEl={avatarAnchorEl}
                                open={isAvatarMenuOpen}
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
                                transformOrigin={{horizontal: "right", vertical: "top"}}
                                anchorOrigin={{horizontal: "right", vertical: "bottom"}}
                            >
                                <MenuItem onClick={handleMyProfile}>My Profile</MenuItem>
                                {isDeveloper && (
                                    <MenuItem onClick={handleServerErrorLogs}>Server Error Logs</MenuItem>
                                )}

                            </Menu>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
