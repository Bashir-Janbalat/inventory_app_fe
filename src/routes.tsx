import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ProductPage from "./pages/ProductsPage.tsx";
import ProductList from "./components/ProductList.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import {Box, Container} from "@mui/material";

const AppRoutes = () => (
    <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Header/>
            <Container sx={{flex: 1, py: 4}}>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/signup" element={<SignUpPage/>}/>
                    <Route path="/products" element={<ProtectedRoute><ProductList/></ProtectedRoute>}/>
                    <Route path="/products/:id" element={<ProtectedRoute><ProductPage/></ProtectedRoute>}/>

                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </Container>
            <Footer/>
        </Box>
    </Router>

);
export default AppRoutes;