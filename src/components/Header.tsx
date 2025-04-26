import React from "react";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {isLoggedIn,removeToken} from "../auth/Auth.ts";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const isAuthenticated = isLoggedIn();

    const handleLogout = () => {
        removeToken();
        navigate("/");
    };

    return (
        <AppBar position="static" sx={{backgroundColor: "#f5f7fa"}}>
            <Toolbar  sx={{justifyContent: "space-between"}}>
                <Typography variant="h6" component={Link} to="/" sx={{color: "blue", textDecoration: "none"}}>
                    Inventory Manager
                </Typography>

                <Box>
                    {isAuthenticated && (
                        <>
                            <Button color="primary" component={Link} to="/dashboard">Dashboard</Button>
                            <Button color="primary" component={Link} to="/products">Products</Button>
                            <Button color="primary" onClick={handleLogout}>Logout</Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
