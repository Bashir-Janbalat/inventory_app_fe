import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {ProductDTO} from '../../types/ProductDTO.ts';
import {deleteProduct, getProductById} from '../../api/ProductApi.ts';
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
    Skeleton,
    Typography,
} from '@mui/material';
import {DetailedApiError} from "../../errors/DetailedApiError.ts";
import CustomSnackbar from "../common/CustomSnackbar.tsx";

const ProductPage: React.FC = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<ProductDTO | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                try {
                    const fetchedProduct = await getProductById(parseInt(id));
                    setProduct(fetchedProduct);
                    setSelectedImage(fetchedProduct.images?.[0]?.imageUrl || null);
                } catch (error) {
                    console.error('Error fetching product:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProduct();
    }, [id]);

    const handleDeleteProduct = async (id: number) => {
        try {
            setIsSubmitting(true);
            const status = await deleteProduct(id);
            if (status === 204) {
                setSnackbarMessage('Product deleted successfully!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                navigate('/products');
            }
        } catch (error) {
            if (error instanceof DetailedApiError) {
                setSnackbarMessage(error.message);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            } else {
                throw error;
            }
        }finally {
            setIsSubmitting(false);
        }
    }
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (loading) {
        return (
            <Container sx={{py: 4, textAlign: 'center'}} maxWidth="sm">
                <Skeleton variant="rectangular" height={400}/>
                <Skeleton variant="text" height={50} sx={{mt: 2}}/>
                <Skeleton variant="text" height={30} sx={{mt: 1}}/>
            </Container>
        );
    }

    if (!product) {
        return (
            <Container sx={{py: 4, textAlign: 'center'}} maxWidth="sm">
                <Typography variant="h5">Product not found.</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{py: 4}} maxWidth="sm">
            <Card
                sx={{
                    maxWidth: 800,
                    mx: 'auto',
                    boxShadow: 4,
                    borderRadius: 3,
                    overflow: 'hidden',
                }}
            >
                {selectedImage ? (
                    <CardMedia
                        component="img"
                        height="400"
                        image={selectedImage}
                        alt={product.name}
                        sx={{objectFit: 'cover', transition: 'opacity 0.5s ease-in'}}
                    />
                ) : (
                    <Skeleton variant="rectangular" height={400}/>
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
                                transition: 'border-color 0.3s',
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
                            ${product.costPrice.toFixed(2)}
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <Typography variant="body1">
                                    <strong>Category:</strong> {product.categoryName}
                                </Typography>
                            </Grid>
                            <Grid size={12}>
                                <Typography variant="body1">
                                    <strong>Brand:</strong> {product.brandName}
                                </Typography>
                            </Grid>
                            <Grid size={12}>
                                <Typography variant="body1">
                                    <strong>Supplier:</strong> {product.supplierName}
                                </Typography>
                            </Grid>
                            <Grid size={12}>
                                <Typography variant="body1">
                                    <strong>Stock:</strong> {product.stock.quantity} units
                                </Typography>
                            </Grid>
                            <Grid size={12}>
                                <Typography variant="body1">
                                    <strong>Warehouse address:</strong> {product.stock.warehouse.address}
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

                    {product.productAttributes.length > 0 && (
                        <Box>
                            <Typography variant="h6" sx={{mb: 2}}>
                                Product Attributes
                            </Typography>
                            <Grid container spacing={2}>
                                {product.productAttributes.map((attribute, index) => (
                                    <Grid size={12} key={index}>
                                        <Typography variant="body2">
                                            <strong>{attribute.attributeName}:</strong> {attribute.attributeValue}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}

                    <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 4}}>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{flex: 1, mr: 1, py: 1.5, fontSize: '16px'}}
                            onClick={() => navigate(`/products/update/${product.id}`)}
                        >
                            Update
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            disabled={isSubmitting}
                            onClick={() => {
                                handleDeleteProduct(Number(id))
                            }}
                            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit"/> : null}
                            sx={{
                                flex: 1, ml: 1, py: 1.5, fontSize: '16px',
                                transform: isSubmitting ? "scale(0.98)" : "scale(1)",
                                opacity: isSubmitting ? 0.7 : 1
                            }}
                        >
                            {isSubmitting ? "Delete..." : 'Delete'}
                        </Button>
                    </Box>
                    <Button
                        variant="outlined"
                        fullWidth
                        sx={{mt: 4, py: 1.5, fontSize: '16px'}}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                </CardContent>
            </Card>
            <CustomSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleSnackbarClose}
            />
        </Container>
    );
};

export default ProductPage;
