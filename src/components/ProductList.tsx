import React, {useEffect, useState} from 'react';
import {ProductDTO} from '../types/ProductDTO';
import {getProducts} from '../api/productApi';
import ProductCard from './ProductCard';
import {CircularProgress, Container, Grid, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

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
                <Grid container spacing={4}>
                    {products.map((product) => (
                        <Grid  key={product.id}>
                            <ProductCard product={product} onClick={() => handleProductClick(product.id)} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default ProductList;
