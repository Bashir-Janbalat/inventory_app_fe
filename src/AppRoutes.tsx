import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import ProductPage from "./components/products/ProductsPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import Layout from "./components/base/Layout.tsx";
import Categories from "./pages/Categories.tsx";
import Brands from "./pages/Brands.tsx"
import Suppliers from "./pages/Suppliers.tsx"
import Products from "./pages/Products.tsx";
import CreateBrand from "./components/brands/CreateBrand.tsx";
import UpdateBrand from "./components/brands/UpdateBrand.tsx";
import CreateSupplier from "./components/suppliers/CreateSupplier.tsx";
import UpdateSupplier from "./components/suppliers/UpdateSupplier.tsx";
import UpdateCategory from "./components/categories/UpdateCategory.tsx";
import CreateCategory from "./components/categories/CreateCategory.tsx";
import ProductForm from "./components/products/ProductForm.tsx";
import MyProfile from "./components/base/MyProfile.tsx";
import Warehouses from "./pages/Warehouses.tsx";
import CreateWarehouse from "./components/warehouses/CreateWarehouse.tsx";
import UpdateWarehous from "./components/warehouses/UpdateWarehous.tsx";
import StockMovements from "./components/stockMovements/StockMovements.tsx";

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
                    <Route path="profile" element={<ProtectedRoute><MyProfile/></ProtectedRoute>}/>
                    <Route path="products" element={<ProtectedRoute><Products/></ProtectedRoute>}/>
                    <Route path="createProduct"
                           element={<ProtectedRoute><ProductForm mode={'create'}/></ProtectedRoute>}/>
                    <Route path="products/:id" element={<ProtectedRoute><ProductPage/></ProtectedRoute>}/>
                    <Route path="products/update/:id"
                           element={<ProtectedRoute><ProductForm mode={'update'}/></ProtectedRoute>}/>
                    <Route path="categories" element={<ProtectedRoute><Categories/></ProtectedRoute>}/>
                    <Route path="categories/update/:id" element={<ProtectedRoute><UpdateCategory/></ProtectedRoute>}/>
                    <Route path="createCategory" element={<ProtectedRoute><CreateCategory/></ProtectedRoute>}/>
                    <Route path="brands" element={<ProtectedRoute><Brands/></ProtectedRoute>}/>
                    <Route path="brands/update/:id" element={<ProtectedRoute><UpdateBrand/></ProtectedRoute>}/>
                    <Route path="createBrand" element={<ProtectedRoute><CreateBrand/></ProtectedRoute>}/>
                    <Route path="suppliers" element={<ProtectedRoute><Suppliers/></ProtectedRoute>}/>
                    <Route path="supplier/update/:id" element={<ProtectedRoute><UpdateSupplier/></ProtectedRoute>}/>
                    <Route path="createSupplier" element={<ProtectedRoute><CreateSupplier/></ProtectedRoute>}/>
                    <Route path="warehouses" element={<ProtectedRoute><Warehouses/></ProtectedRoute>}/>
                    <Route path="createWarehous" element={<ProtectedRoute><CreateWarehouse/></ProtectedRoute>}/>
                    <Route path="warehous/update/:id" element={<ProtectedRoute><UpdateWarehous/></ProtectedRoute>}/>
                    <Route path="stockmovement" element={<ProtectedRoute><StockMovements/></ProtectedRoute>}/>

                    <Route path="*" element={<ProtectedRoute><NotFoundPage/></ProtectedRoute>}/>
                </Route>
            </Routes>
        </Router>
    );
};


export default AppRoutes;