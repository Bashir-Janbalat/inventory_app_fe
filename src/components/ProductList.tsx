import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {CircularProgress, Container, Grid, Pagination, Stack,} from '@mui/material';
import {ProductDTO} from '../types/ProductDTO';
import {BrandDTO} from "../types/BrandDTO.ts";
import {CategoryDTO} from "../types/CategoryDTO.ts";
import {SupplierDTO} from "../types/SupplierDTO.ts";
import {getProducts} from '../api/ProductApi.ts';
import {getCategories} from "../api/CategoryApi.ts";
import {getBrands} from "../api/BrandApi.ts";
import ProductCard from './ProductCard';
import ProductFilters from "./filters/ProductFilters.tsx";
import {getSuppliers} from "../api/SupplierApi.ts";

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [searchBy, setSearchBy] = useState<string>('');
    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);
    const [brands, setBrands] = useState<BrandDTO[]>([]);
    const [categoryName, setCategoryName] = useState<string>('');
    const [brandName, setBrandName] = useState<string>('');
    const [supplierName, setSupplierName] = useState<string>('');
    const size = 6;

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [categoriesResponse, brandsResponse, suppliersResponse] = await Promise.all([
                getCategories(),
                getBrands(),
                getSuppliers()
            ]);
            setCategories(categoriesResponse.content);
            setBrands(brandsResponse.content);
            setSuppliers(suppliersResponse.content)
        } catch (error) {
            console.error('Error fetching initial data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const productResponse =
                await getProducts(page - 1, size, sortBy, sortDirection, searchBy, categoryName, brandName,supplierName);
            setProducts(productResponse.content);
            setTotalPages(productResponse.totalPages);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, sortBy, sortDirection, searchBy, categoryName, brandName,supplierName]);


    useEffect(() => {
        fetchInitialData();
    }, []);


    const handleProductClick = (id: number) => {
        navigate(`/products/${id}`);
    };

    return (
        <Container sx={{py: 4}}>
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
            {
                loading ? (<Grid container justifyContent="center"><CircularProgress/></Grid>) : (
                    <>
                        <Grid container spacing={4}>
                            {products.map((product) => (
                                <Grid key={product.id}>
                                    <ProductCard product={product} onClick={() => handleProductClick(product.id)}/>
                                </Grid>
                            ))}
                        </Grid>
                        <Stack alignItems="center" mt={4}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={(_event, value) => setPage(value)}
                                color="primary"
                                sx={{
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                        boxShadow: 6,
                                        cursor: 'pointer'
                                    },
                                }}
                            />
                        </Stack>
                    </>
                )}
        </Container>
    );
};

export default ProductList;
