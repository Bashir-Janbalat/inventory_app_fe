import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";

const Footer: React.FC = () => {
    return (
        <Box component="footer" sx={{
                py: 3,
                px: 2,
                mt: "auto",
                backgroundColor: "#0d47a1",
                color: "white",
                textAlign: "center",
            }}
        >
            <Typography variant="body2">
                &copy; {new Date().getFullYear()} Inventory Manager. All rights reserved.
            </Typography>
            <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
                Made with ❤️ by{"  "}
                <MuiLink href="https://github.com/Bashir-Janbalat" target="_blank" color="inherit" underline="hover">
                    Bashir-Janbalat
                </MuiLink>
            </Typography>
        </Box>
    );
};

export default Footer;