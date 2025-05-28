import React from "react";
import {Box, Link as MuiLink, Typography, useTheme} from "@mui/material";

const Footer: React.FC = () => {
    const theme = useTheme(); // نحصل على الثيم الحالي (فاتح أو داكن)

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: "auto",
                backgroundColor: theme.palette.background.default, // الخلفية
                color: theme.palette.text.primary, // النص
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                boxShadow: `0px 4px 10px ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`, // ظل مع قيمة واضحة
                borderRadius: "10px",
            }}
        >
            <Typography variant="body2" align="center">
                &copy; {new Date().getFullYear()} Inventory Manager. All rights reserved.
            </Typography>

            <Typography variant="caption" align="center">
                Made with ❤️ by{" "}
                <MuiLink
                    href="https://github.com/Bashir-Janbalat"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
                >
                    Bashir-Janbalat
                </MuiLink>
            </Typography>
        </Box>
    );
};

export default Footer;
