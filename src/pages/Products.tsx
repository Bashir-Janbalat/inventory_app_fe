import React, {useEffect, useState} from "react";
import {Container, Typography} from "@mui/material";
import {Navigate} from "react-router-dom";
import {ProductDTO} from "../types/ProductDTO.ts";
import {CategoryDTO} from "../types/CategoryDTO.ts";
import {SupplierDTO} from "../types/SupplierDTO.ts";
import {BrandDTO} from "../types/BrandDTO.ts";
import {getCategories} from "../api/CategoryApi.ts";
import {getBrands} from "../api/BrandApi.ts";
import {getSuppliers} from "../api/SupplierApi.ts";
import {getProducts} from "../api/ProductApi.ts";
import ProductFilters from "../components/filters/ProductFilters.tsx";
import ProductList from "../components/products/ProductList.tsx";
import {ErrorMessage} from "../components/common/ErrorMessage.tsx";
import {useApiErrorHandler} from "../hooks/useApiErrorHandler.ts";
import Loading from "../components/base/Loading.tsx";
import {useLoading} from "../hooks/useLoading.ts";

const Products: React.FC = () => {
    const {loading: loadingProducts, withLoading: withLoadingProducts} = useLoading();
    const {loading: loadingInitialData, withLoading: withLoadingInitialData} = useLoading();
    const {
        error: fetchingProductsError,
        handleError: handleFetchingProductsError,
        sessionExpired,
        resetError
    } = useApiErrorHandler();

    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [searchBy, setSearchBy] = useState<string>('');
    const [categoryName, setCategoryName] = useState<string>('');
    const [brandName, setBrandName] = useState<string>('');
    const [supplierName, setSupplierName] = useState<string>('');
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);
    const [brands, setBrands] = useState<BrandDTO[]>([]);
    const size = 6;

    const fetchInitialData = async () => {
        await withLoadingInitialData(async () => {
            const [categoriesResponse, brandsResponse, suppliersResponse] = await Promise.all([
                getCategories(),
                getBrands(),
                getSuppliers()
            ]);
            setCategories(categoriesResponse.content);
            setBrands(brandsResponse.content);
            setSuppliers(suppliersResponse.content);
        }, (error) => {
            console.error('Error fetching initial data:', error);
            handleFetchingProductsError(error);
        });
    };

    const fetchProducts = async () => {
        await withLoadingProducts(async () => {
            const productResponse = await getProducts(
                page - 1, size, sortBy, sortDirection, searchBy, categoryName, brandName, supplierName
            );
            setProducts(productResponse.content);
            setTotalPages(productResponse.totalPages);
        }, (error) => {
            console.error('Error fetching products:', error);
            handleFetchingProductsError(error);
        });
    };

    useEffect(() => {
        fetchProducts();
    }, [page, sortBy, sortDirection, searchBy, categoryName, brandName, supplierName]);

    useEffect(() => {
        fetchInitialData();
    }, []);

    if (sessionExpired) {
        return <Navigate to="/login" replace/>;
    }
    if (loadingProducts || loadingInitialData) {
        return <Loading fullScreen message="Loading products..."/>;
    }
    if (fetchingProductsError) {
        return <ErrorMessage message={fetchingProductsError} onRetry={() => {
            resetError();
            fetchProducts();
        }}/>;
    }

    return (
        <Container>
            <Typography variant="h4" sx={{mb: 4, fontWeight: 'bold'}}>Products</Typography>
            <ProductFilters
                sortBy={sortBy}
                sortDirection={sortDirection}
                searchBy={searchBy}
                categoryName={categoryName}
                brandName={brandName}
                categories={categories}
                brands={brands}
                supplierName={supplierName}
                suppliers={suppliers}
                setSortBy={setSortBy}
                setSortDirection={setSortDirection}
                setSearchBy={setSearchBy}
                setCategoryName={setCategoryName}
                setBrandName={setBrandName}
                setSupplierName={setSupplierName}
                setPage={setPage}
            />
            <ProductList
                products={products}
                totalPages={totalPages}
                page={page}
                setPage={setPage}
            />
        </Container>
    );
};

export default Products;
