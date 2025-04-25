import React, {useEffect, useState} from 'react';
import {ProductDTO} from '../types/ProductDTO';
import {getProducts} from '../api/productApi';
import ProductCard from './ProductCard';
import {CircularProgress, Container, Grid, Pagination, Stack, Typography,} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const pageSize = 6;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const productResponse = await getProducts(page - 1, pageSize);
                setProducts(productResponse.content);
                setTotalPages(productResponse.totalPages);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page]);

    const handleProductClick = (id: number) => {
        navigate(`/products/${id}`);
    };

    return (
        <Container sx={{py: 4}}>
            <Typography variant="h3" gutterBottom align="center">
                Our Products
            </Typography>

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
                        />
                    </Stack>
                </>
            )}
        </Container>
    );
};

export default ProductList;
