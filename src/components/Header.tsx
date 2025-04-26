import React from "react";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, removeToken } from "../auth/Auth.ts";
import { Brightness4, Brightness7 } from "@mui/icons-material";

interface HeaderProps {
    darkMode: boolean;
    setDarkMode: (mode: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
    const navigate = useNavigate();
    const isAuthenticated = isLoggedIn();

    const handleLogout = () => {
        removeToken();
        navigate("/");
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: darkMode ? "#333" : "#f5f7fa", boxShadow: 4, mb: 4 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        color: darkMode ? "white" : "primary.main",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                    }}
                >
                    Inventory Manager
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <IconButton color="primary" onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>

                    {isAuthenticated && (
                        <>
                            <Button
                                variant="outlined"
                                color="primary"
                                component={Link}
                                to="/dashboard"
                                sx={{ color: darkMode ? "white" : "primary.main" }}
                            >
                                Dashboard
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                component={Link}
                                to="/products"
                                sx={{ color: darkMode ? "white" : "primary.main" }}
                            >
                                Products
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleLogout}
                                sx={{ color: "white" }}
                            >
                                Logout
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
