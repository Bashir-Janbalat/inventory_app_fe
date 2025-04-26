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
    Stack,
    Typography,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState<'name' | 'price'>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const pageSize = 6;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const productResponse = await getProducts(page - 1, pageSize, sortBy, sortDirection);
                setProducts(productResponse.content);
                setTotalPages(productResponse.totalPages);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, sortBy, sortDirection]);

    const handleProductClick = (id: number) => {
        navigate(`/products/${id}`);
    };

    return (
        <Container sx={{py: 4}}>
            <Typography variant="h3" gutterBottom align="center">
                Our Products
            </Typography>

            <Stack direction="row" spacing={2} sx={{mb: 3}}>
                {/* Sort by field */}
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
