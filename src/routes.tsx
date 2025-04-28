import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ProductPage from "./pages/ProductsPage.tsx";
import ProductList from "./components/ProductList.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Layout from "./components/Layout.tsx";

interface AppRoutesProps {
    darkMode: boolean;
    setDarkMode: (mode: boolean) => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({darkMode, setDarkMode}) => {

    return (
        <Router>
            <Routes>
                {/* Layout wird einmal geladen, darunter die Seiten */}
                <Route path="/" element={<Layout darkMode={darkMode} setDarkMode={setDarkMode}/>}>
                    {/* index = "/" */}
                    <Route index element={<LoginPage/>}/>

                    {/* normale Seiten */}
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="signup" element={<SignUpPage/>}/>

                    {/* geschützte Seiten */}
                    <Route path="products" element={<ProtectedRoute><ProductList/></ProtectedRoute>}/>
                    <Route path="products/:id" element={<ProtectedRoute><ProductPage/></ProtectedRoute>}/>

                    {/* 404 Seite */}
                    <Route path="*" element={<ProtectedRoute><NotFoundPage/></ProtectedRoute>}/>
                </Route>
            </Routes>
        </Router>
    );
};


export default AppRoutes;