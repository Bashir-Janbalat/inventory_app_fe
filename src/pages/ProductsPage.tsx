import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {ProductDTO} from '../types/ProductDTO';
import {getProductById} from '../api/ProductApi.ts';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Typography,
} from '@mui/material';

const ProductPage: React.FC = () => {
    const {id} = useParams();
    const [product, setProduct] = useState<ProductDTO | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                try {
                    const fetchedProduct = await getProductById(parseInt(id));
                    setProduct(fetchedProduct);
                    setSelectedImage(fetchedProduct.images[0]?.imageUrl || null); // نختار أول صورة تلقائيًا
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
            <Container sx={{py: 4, textAlign: 'center'}} maxWidth="sm">
                <CircularProgress/>
            </Container>
        );
    }

    return (
        <Container sx={{py: 4}} maxWidth="md">
            {product && (
                <Card
                    sx={{
                        maxWidth: 800,
                        mx: 'auto',
                        boxShadow: 4,
                        borderRadius: 3,
                        overflow: 'hidden',
                    }}
                >
                    {selectedImage && (
                        <CardMedia
                            component="img"
                            height="400"
                            image={selectedImage}
                            alt={product.name}
                            sx={{objectFit: 'cover'}}
                        />
                    )}

                    <Box sx={{display: 'flex', overflowX: 'auto', p: 2}}>
                        {product.images.map((img, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    mr: 2,
                                    cursor: 'pointer',
                                    borderRadius: 2,
                                    border: selectedImage === img.imageUrl ? '2px solid #1976d2' : '2px solid transparent',
                                    overflow: 'hidden',
                                    flexShrink: 0,
                                }}
                                onClick={() => setSelectedImage(img.imageUrl)}
                            >
                                <img
                                    src={img.imageUrl}
                                    alt={img.altText || product.name}
                                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                />
                            </Box>
                        ))}
                    </Box>

                    <CardContent sx={{p: 3}}>
                        <Box sx={{mb: 3}}>
                            <Typography variant="h4" sx={{fontWeight: 'bold', mb: 1}}>
                                {product.name}
                            </Typography>
                            <Typography variant="h6" color="primary" sx={{fontSize: '22px', mb: 2}}>
                                ${product.price.toFixed(2)}
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <Typography variant="body1">
                                        <strong>Category:</strong> {product.categoryName}
                                    </Typography>
                                </Grid>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <Typography variant="body1">
                                        <strong>Brand:</strong> {product.brandName}
                                    </Typography>
                                </Grid>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <Typography variant="body1">
                                        <strong>Supplier:</strong> {product.supplierName}
                                    </Typography>
                                </Grid>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <Typography variant="body1">
                                        <strong>Stock:</strong> {product.stock.quantity} units
                                    </Typography>
                                </Grid>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <Typography variant="body1">
                                        <strong>Warehouse Location:</strong> {product.stock.warehouseLocation}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider sx={{my: 3}}/>

                        <Box sx={{mb: 3}}>
                            <Typography variant="h6" sx={{mb: 1}}>
                                Description
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.description || 'No description available.'}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h6" sx={{mb: 2}}>
                                Product Attributes
                            </Typography>
                            <Grid container spacing={2}>
                                {product.productAttributes.map((attribute, index) => (
                                    <Grid size={{xs: 12, sm: 6}} key={index}>
                                        <Typography variant="body2">
                                            <strong>{attribute.attributeName}:</strong> {attribute.attributeValue}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{mt: 4, py: 1.5, fontSize: '16px'}}
                        >
                            Add to Cart
                        </Button>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
};

export default ProductPage;
