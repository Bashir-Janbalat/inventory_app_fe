import {useMemo, useState} from "react";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import AppRoutes from "./AppRoutes.tsx";
import {AuthProvider} from "./auth/AuthContext.tsx";

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
        /*  <AuthProvider>	Bietet globalen Zugriff auf Auth-Daten (Login-Status, Username, Logout-Funktion etc.).
            <ThemeProvider>	Übergibt das theme (Dark/Light Mode) an alle MUI-Komponenten.
            <CssBaseline>	Setzt ein konsistentes CSS-Reset, damit das Styling auf allen Browsern gleich aussieht.
            <AppRoutes>	Deine App-Routing-Komponente, steuert die Seiten (Home, Login, Dashboard, etc.).
        */

        <AuthProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppRoutes darkMode={darkMode} setDarkMode={setDarkMode}/>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
