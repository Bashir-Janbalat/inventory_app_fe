import React, {useEffect, useState} from "react";
import {Container, Typography} from "@mui/material";
import {ProductDTO} from "../types/ProductDTO.ts";
import {CategoryDTO} from "../types/CategoryDTO.ts";
import {SupplierDTO} from "../types/SupplierDTO.ts";
import {BrandDTO} from "../types/BrandDTO.ts";
import {getCategories, getCategorySize} from "../api/CategoryApi.ts";
import {getBrands, getBrandSize} from "../api/BrandApi.ts";
import {getSuppliers, getSupplierSize} from "../api/SupplierApi.ts";
import {getProducts} from "../api/ProductApi.ts";
import ProductFilters from "../components/filters/ProductFilters.tsx";
import ProductList from "../components/products/ProductList.tsx";
import {ErrorMessage} from "../components/common/ErrorMessage.tsx";
import Loading from "../components/base/Loading.tsx";
import {useFetcher} from "../hooks/useFetcher.ts";

const Products: React.FC = () => {
    const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [searchBy, setSearchBy] = useState<string>('');
    const [categoryName, setCategoryName] = useState<string>('');
    const [brandName, setBrandName] = useState<string>('');
    const [supplierName, setSupplierName] = useState<string>('');
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);
    const [brands, setBrands] = useState<BrandDTO[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const size = 6;

    const {fetchData: fetchProducts, loading: productLoading, error: fetchingProductsError} = useFetcher<ProductDTO[]>(
        async () => {
            const productResponse = await getProducts(page - 1, size, sortBy, sortDirection, searchBy, categoryName, brandName, supplierName);
            setProducts(productResponse.content);
            setTotalPages(productResponse.totalPages);
            return productResponse.content;
        });

    const {fetchData: fetchInitialData, loading: initialDataLoading, error: initialDataError} = useFetcher(
        async () => {
            const [categorySize, brandSize, supplierSize] = await Promise.all([
                getCategorySize(),
                getBrandSize(),
                getSupplierSize(),
            ]);
            const [categoriesResponse, brandsResponse, suppliersResponse] = await Promise.all([
                getCategories(page - 1,categorySize),
                getBrands(page - 1, brandSize),
                getSuppliers(page - 1, supplierSize),
            ]);
            setCategories(categoriesResponse.content);
            setBrands(brandsResponse.content);
            setSuppliers(suppliersResponse.content);
            return {
                categories: categoriesResponse.content,
                brands: brandsResponse.content,
                suppliers: suppliersResponse.content,
            };
        });

    useEffect(() => {
        fetchProducts();
    }, [page, sortBy, sortDirection, searchBy, categoryName, brandName, supplierName]);

    useEffect(() => {
        fetchInitialData();
    }, []);

    if (productLoading || initialDataLoading) {
        return <Loading fullScreen message="Loading products..."/>;
    }
    if (fetchingProductsError) {
        return <ErrorMessage message={fetchingProductsError} onRetry={() => {
            fetchProducts()
        }}/>;
    }
    if (initialDataError) {
        return <ErrorMessage message={initialDataError} onRetry={() => {
            fetchInitialData();
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
                items={products}
                totalPages={totalPages}
                page={page}
                setPage={setPage}
            />
        </Container>
    );
};

export default Products;
