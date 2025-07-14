import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProtectedRoute from "./auth/ProtectedRoute.tsx";
import SingleProduct from "./components/products/SingleProduct.tsx";
import Layout from "./components/base/Layout.tsx";
import Categories from "./components/categories/Categories.tsx";
import Brands from "./components/brands/Brands.tsx"
import Suppliers from "./components/suppliers/Suppliers.tsx"
import Products from "./components/products/Products.tsx";
import CreateBrand from "./components/brands/CreateBrand.tsx";
import UpdateBrand from "./components/brands/UpdateBrand.tsx";
import CreateSupplier from "./components/suppliers/CreateSupplier.tsx";
import UpdateSupplier from "./components/suppliers/UpdateSupplier.tsx";
import UpdateCategory from "./components/categories/UpdateCategory.tsx";
import CreateCategory from "./components/categories/CreateCategory.tsx";
import ProductForm from "./components/products/ProductForm.tsx";
import MyProfile from "./components/base/MyProfile.tsx";
import Warehouses from "./components/warehouses/Warehouses.tsx";
import CreateWarehouse from "./components/warehouses/CreateWarehouse.tsx";
import StockMovements from "./components/stockMovements/StockMovements.tsx";
import UpdateWarehouse from "./components/warehouses/UpdateWarehouse.tsx";
import LoginLayout from "./components/base/LoginLayout.tsx"
import CreatePurchase from "./components/purchase/CreatePurchase.tsx";
import Purchases from "./components/purchase/Purchases.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import UserManagement from "./components/users/UserManagement.tsx";
import ErrorLogPage from "./errors/ErrorLogPage.tsx";
import LoginPage from "./components/auth/LoginPage.tsx";
import SignUpPage from "./components/auth/SignUpPage.tsx";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage.tsx";
import ResetPasswordPage from "./components/auth/ResetPasswordPage.tsx";
import NotFoundPage from "./components/common/NotFoundPage.tsx";

interface AppRoutesProps {
    darkMode: boolean;
    setDarkMode: (mode: boolean) => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({darkMode, setDarkMode}) => {
    const userRoutes = [
        {path: "profile", element: <MyProfile/>},
        {path: "userManagement", element: <UserManagement/>},
    ]

    const authRoutes = [
        {path: "login", element: <LoginPage/>},
        {path: "signup", element: <SignUpPage/>},
        {path: "forgot-password", element: <ForgotPasswordPage/>},
        {path: "reset-password", element: <ResetPasswordPage/>},
    ];

    const purchaseRoutes = [
        {path: "purchases", element: <Purchases/>},
        {path: "createPurchase", element: <CreatePurchase/>},
    ];

    const productRoutes = [
        {path: "products", element: <Products/>},
        {path: "createProduct", element: <ProductForm mode={'create'}/>},
        {path: "products/:id", element: <SingleProduct/>},
        {path: "products/update/:id", element: <ProductForm mode={'update'}/>},

    ];

    const categoryRoutes = [
        {path: "categories", element: <Categories/>},
        {path: "categories/update/:id", element: <UpdateCategory/>},
        {path: "createCategory", element: <CreateCategory/>},
    ];

    const brandRoutes = [
        {path: "brands", element: <Brands/>},
        {path: "brands/update/:id", element: <UpdateBrand/>},
        {path: "createBrand", element: <CreateBrand/>},
    ];

    const supplierRoutes = [
        {path: "suppliers", element: <Suppliers/>},
        {path: "suppliers/update/:id", element: <UpdateSupplier/>},
        {path: "createSupplier", element: <CreateSupplier/>},
    ];

    const warehouseRoutes = [
        {path: "warehouses", element: <Warehouses/>},
        {path: "warehouses/update/:id", element: <UpdateWarehouse/>},
        {path: "createWarehouse", element: <CreateWarehouse/>},
        {path: "stockmovement", element: <StockMovements/>},
    ];
    const commonRoutes = [
        {path: "dashboard", element: <Dashboard/>},
    ];

    const logRoutes = [
        { path: "errorLogs", element: <ErrorLogPage/> },
    ];

    return (
        <Router basename="/inventory-app">
            <Routes>
                <Route element={<LoginLayout/>}>
                    <Route index element={<LoginPage/>}/>
                    {authRoutes.map(({path, element}) => (
                        <Route key={path} path={path} element={element}/>
                    ))}
                </Route>
                <Route element={<Layout darkMode={darkMode} setDarkMode={setDarkMode}/>}>
                    {[...userRoutes, ...productRoutes, ...categoryRoutes,
                        ...brandRoutes, ...supplierRoutes, ...warehouseRoutes,
                        ...purchaseRoutes, ...commonRoutes, ...logRoutes].map(
                        ({path, element}) => (
                            <Route key={path} path={path} element={<ProtectedRoute>{element}</ProtectedRoute>}/>
                        )
                    )}
                    <Route path="*" element={<ProtectedRoute><NotFoundPage/></ProtectedRoute>}/>
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;