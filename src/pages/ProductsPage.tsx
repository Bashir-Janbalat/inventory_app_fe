import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductDTO } from '../types/ProductDTO';
import { getProductById } from '../api/productApi';
import { Card, CardContent, Typography, Button, CardMedia, Container, CircularProgress } from '@mui/material';

const ProductPage: React.FC = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductDTO | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                try {
                    const fetchedProduct = await getProductById(parseInt(id));
                    setProduct(fetchedProduct);
                } catch (error) {
                    console.error('Error fetching product:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <Container sx={{ py: 4 }} maxWidth="sm">
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }} maxWidth="sm">
            {product && (
                <Card>
                    <CardMedia
                        component="img"
                        height="300"
                        image={product.images[0]?.url}
                        alt={product.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {product.description}
                        </Typography>
                        <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
                            ${product.price}
                        </Typography>
                        <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
                            Category: {product.categoryName}
                        </Typography>
                        <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
                            Brand: {product.brandName}
                        </Typography>
                        <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
                            Supplier: {product.supplierName}
                        </Typography>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                            Add to Cart
                        </Button>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
};

export default ProductPage;
