import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ProductPage from "./pages/ProductsPage.tsx";
import ProductList from "./components/ProductList.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";


const AppRoutes = () => (

    <Router>
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/products" element={<ProtectedRoute><ProductList/></ProtectedRoute>}/>
            <Route path="/products/:id" element={<ProtectedRoute><ProductPage/></ProtectedRoute>}/>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </Router>
);
export default AppRoutes;