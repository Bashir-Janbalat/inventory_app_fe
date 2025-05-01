import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import ProductPage from "./pages/ProductsPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Layout from "./components/base/Layout.tsx";
import Categories from "./pages/Categories.tsx";
import Brands from "./pages/Brands.tsx"
import Suppliers from "./pages/Suppliers.tsx"
import Products from "./pages/Products.tsx";
import CreateBrand from "./components/brands/CreateBrand.tsx";

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
                    <Route path="products" element={<ProtectedRoute><Products/></ProtectedRoute>}/>
                    <Route path="products/:id" element={<ProtectedRoute><ProductPage/></ProtectedRoute>}/>
                    <Route path="categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
                    <Route path="brands" element={<ProtectedRoute><Brands /></ProtectedRoute>} />
                    <Route path="createBrand" element={<ProtectedRoute><CreateBrand/></ProtectedRoute>} />
                    <Route path="suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />

                    <Route path="*" element={<ProtectedRoute><NotFoundPage/></ProtectedRoute>}/>
                </Route>
            </Routes>
        </Router>
    );
};


export default AppRoutes;