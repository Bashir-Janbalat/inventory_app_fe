import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
                Seite nicht gefunden
            </Typography>
            <Typography variant="body1" mb={4}>
                Die von dir angeforderte Seite existiert nicht oder wurde verschoben.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate("/")}>
                Zurück zur Startseite
            </Button>
        </Box>
    );
};

export default NotFoundPage;
