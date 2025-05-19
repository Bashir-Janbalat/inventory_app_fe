import React from "react";
import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            p={3}
        >
            <Typography variant="h2" fontWeight="bold" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" gutterBottom>
                Page not found.
            </Typography>
            <Typography variant="body1" mb={4}>
                The page you requested does not exist or has been moved..
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate("/")}>
                Back to the homepage
            </Button>
        </Box>
    );
};

export default NotFoundPage;
