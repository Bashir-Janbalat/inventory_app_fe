import React, {useEffect, useState} from 'react';
import {ProductDTO} from '../types/ProductDTO';
import {getProducts} from '../api/ProductApi.ts';
import ProductCard from './ProductCard';
import {
    CircularProgress,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {getCategories} from "../api/CategoryApi.ts";
import {CategoryDTO} from "../types/CategoryDTO.ts";
import {getBrands} from "../api/BrandApi.ts";
import {BrandDTO} from "../types/BrandDTO.ts";

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
    const [brands, setBrands] = useState<BrandDTO[]>([]);
    const [category, setCategory] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const pageSize = 6;

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const productResponse = await getProducts(page - 1, pageSize, sortBy, sortDirection, searchBy);
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
    }, [page, sortBy, sortDirection, searchBy, category, brand]);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const categoryResponse = await getCategories();
            setCategories(categoryResponse.content);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };
    const fetchBrands = async () => {
        setLoading(true);
        try {
            const brandResponse = await getBrands();
            setBrands(brandResponse.content);
        } catch (error) {
            console.error('Error fetching brands:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchBrands();
    }, []);


    const handleProductClick = (id: number) => {
        navigate(`/products/${id}`);
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchBy(e.target.value);
        setPage(1);
    };
    const handleCategoryChange = (e: SelectChangeEvent<string>) => {
        setCategory(e.target.value);
        setPage(1);
    };

    const handleBrandChange = (e: SelectChangeEvent<string>) => {
        setBrand(e.target.value);
        setPage(1);
    };

    return (
        <Container sx={{py: 4}}>

            <Stack direction="row" spacing={2} sx={{mb: 3}}>
                <FormControl sx={{minWidth: 120}}>
                    <InputLabel>Sort by</InputLabel>
                    <Select
                        value={sortBy}
                        label="Sort by"
                        onChange={(e) => {
                            setSortBy(e.target.value as 'name' | 'price');
                            setPage(1);
                        }}
                    >
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="price">Price</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{minWidth: 120}}>
                    <InputLabel>Direction</InputLabel>
                    <Select
                        value={sortDirection}
                        label="Direction"
                        onChange={(e) => {
                            setSortDirection(e.target.value as 'asc' | 'desc');
                            setPage(1);
                        }}
                    >
                        <MenuItem value="asc">Ascending ↑</MenuItem>
                        <MenuItem value="desc">Descending ↓</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{minWidth: 200}}>
                    <TextField
                        label="Search by name"
                        value={searchBy}
                        onChange={handleSearchChange}
                        fullWidth

                    />
                </FormControl>
                <FormControl sx={{minWidth: 120}}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        label="Category"
                        onChange={handleCategoryChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.name}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{minWidth: 120}}>
                    <InputLabel>Brand</InputLabel>
                    <Select
                        value={brand}
                        label="Brand"
                        onChange={handleBrandChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        {brands.map((b) => (
                            <MenuItem key={b.id} value={b.name}>
                                {b.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
            {loading ? (
                <Grid container justifyContent="center">
                    <CircularProgress/>
                </Grid>
            ) : (
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
