import React, {useEffect, useState} from "react";
import {ProductDTO} from "../types/ProductDTO.ts";
import {CategoryDTO} from "../types/CategoryDTO.ts";
import {SupplierDTO} from "../types/SupplierDTO.ts";
import {BrandDTO} from "../types/BrandDTO.ts";
import {getCategories} from "../api/CategoryApi.ts";
import {getBrands} from "../api/BrandApi.ts";
import {getSuppliers} from "../api/SupplierApi.ts";
import {getProducts} from "../api/ProductApi.ts";
import {CircularProgress, Container, Grid, Typography} from "@mui/material";
import ProductFilters from "../components/filters/ProductFilters.tsx";
import ProductList from "../components/ProductList.tsx";


const Products: React.FC = () => {
    const [loading, setLoading] = useState(true);
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
                await getProducts(page - 1, size, sortBy, sortDirection, searchBy, categoryName, brandName, supplierName);
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
    }, [page, sortBy, sortDirection, searchBy, categoryName, brandName, supplierName]);

    useEffect(() => {
        fetchInitialData();
    }, []);

    return (
        <Container sx={{py: 4, pt: {xs: '80px', sm: '80px'}, minHeight: '100vh',overflow: 'auto', height: '100%'}}>
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
            {
                loading ?
                    (<Grid container justifyContent="center"><CircularProgress/></Grid>) :
                    (<ProductList
                        products={products}
                        totalPages={totalPages}
                        page={page}
                        setPage={setPage}
                    ></ProductList>)
            }

        </Container>
    );

};
export default Products;

