import  {useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import AppRoutes from "./routes.tsx";

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode ? "dark" : "light",
                },
            }),
        [darkMode]
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRoutes darkMode={darkMode} setDarkMode={setDarkMode} />
        </ThemeProvider>
    );
}

export default App;
