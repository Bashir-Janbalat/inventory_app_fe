import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Container, Typography} from "@mui/material";
import debounce from 'lodash/debounce';
import {ProductDTO} from "../types/ProductDTO.ts";
import {getProducts} from "../api/ProductApi.ts";
import ProductFilters from "../components/filters/ProductFilters.tsx";
import ProductList from "../components/products/ProductList.tsx";
import {ErrorMessage} from "../components/common/ErrorMessage.tsx";
import Loading from "../components/base/Loading.tsx";
import {useFetcher} from "../hooks/useFetcher.ts";
import createFetcher from "../hooks/useProductFormData.ts";

const Products: React.FC = () => {
    const [sortBy, setSortBy] = useState<'name' | 'costPrice'>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [searchBy, setSearchBy] = useState<string>('');
    const [categoryName, setCategoryName] = useState<string>('');
    const [brandName, setBrandName] = useState<string>('');
    const [supplierName, setSupplierName] = useState<string>('');
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const size = 6;
    const options = {
        loadCategories: true,
        loadBrands: true,
        loadSuppliers: true,
        loadWarehouses: false,
        loadProduct: false,
    };

    const fetcher = useCallback(async () => {
        const productResponse = await getProducts(page - 1, size, sortBy, sortDirection, searchBy, categoryName, brandName, supplierName);
        setProducts(productResponse.content);
        setTotalPages(productResponse.totalPages);
        return productResponse.content;
    }, [page, size, sortBy, sortDirection, searchBy, categoryName, brandName, supplierName]);

    const {
        fetchData: fetchProducts,
        loading: productLoading,
        error: fetchingProductsError
    } = useFetcher<ProductDTO[]>(fetcher);

    const {
        fetchData: fetchInitialData,
        loading: initialDataLoading,
        error: initialDataError,
        categories,
        brands,
        suppliers
    } = createFetcher(undefined, options);
    useEffect(() => {
        fetchInitialData().catch(console.error);
    }, [page, sortBy, sortDirection, categoryName, brandName, supplierName,fetchInitialData]);

    const debouncedFetchProducts = useMemo(
        () =>
            debounce(() => {
                fetchProducts().catch(console.error);
            }, 600),
        [fetchProducts]
    );
    useEffect(() => {
        if (searchBy.trim() === '') {
            fetchProducts().catch(console.error);
        } else {
            debouncedFetchProducts();
        }
        return () => {
            debouncedFetchProducts.cancel();
        };
    }, [searchBy, debouncedFetchProducts, fetchProducts]);




    if (productLoading || initialDataLoading) {
        return <Loading fullScreen message="Loading products..."/>;
    }
    if (fetchingProductsError) {
        return <ErrorMessage message={fetchingProductsError} onRetry={() => {
            fetchProducts().catch(console.error);
        }}/>;
    }
    if (initialDataError) {
        return <ErrorMessage message={initialDataError} onRetry={() => {
            fetchInitialData().catch(console.error);
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
