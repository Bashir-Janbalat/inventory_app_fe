import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    Divider,
    Skeleton,
    Typography
} from '@mui/material';
import {ProductDTO} from '../../types/ProductDTO.ts';
import {deleteProduct} from '../../api/ProductApi.ts';
import CustomSnackbar from '../common/CustomSnackbar.tsx';
import {ErrorMessage} from '../common/ErrorMessage.tsx';
import createFetcher from '../../hooks/useProductFormData.ts';
import {DetailedApiError} from '../../errors/DetailedApiError.ts';

const ProductPage: React.FC = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [productDTO, setProductDTO] = useState<ProductDTO>();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {fetchData, loading, error, product} = createFetcher(id, {
        loadProduct: true,
        loadCategories: false,
        loadBrands: false,
        loadSuppliers: false,
        loadWarehouses: false,
    });

    useEffect(() => {
        fetchData().catch(console.error);
    }, [fetchData]);

    useEffect(() => {
        if (product) {
            setProductDTO(product);
            setSelectedImage(product.images?.[0]?.imageUrl || null);
        }
    }, [product]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleDelete = async (id: number) => {
        try {
            setIsSubmitting(true);
            const status = await deleteProduct(id);
            if (status === 204) {
                setSnackbarOpen(true);
                setSnackbarMessage('Product deleted successfully!');
                setSnackbarSeverity('success');
                navigate('/products');
            }
        } catch (error) {
            if (error instanceof DetailedApiError) {
                setSnackbarOpen(true);
                setSnackbarMessage(error.message);
                setSnackbarSeverity('error');
            } else {
                throw error;
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Container maxWidth="sm" sx={{py: 4, textAlign: 'center'}}>
                <Skeleton variant="rectangular" height={400}/>
                <Skeleton height={40} sx={{mt: 2}}/>
                <Skeleton height={20}/>
            </Container>
        );
    }

    if (error) {
        return <ErrorMessage message={error} onRetry={() => fetchData().catch(console.error)}/>;
    }

    if (!productDTO) {
        return (
            <Container maxWidth="sm" sx={{py: 4}}>
                <Typography variant="h5" align="center">Product not found.</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{py: 4}}>
            <Card sx={{maxWidth: 500, mx: 'auto', boxShadow: 2, borderRadius: 2}}>
                {selectedImage ? (
                    <CardMedia
                        component="img"
                        height="200"
                        image={selectedImage}
                        alt={productDTO.name}
                        sx={{objectFit: 'cover'}}
                    />
                ) : (
                    <Skeleton variant="rectangular" height={200}/>
                )}

                <Box sx={{display: 'flex', overflowX: 'auto', px: 1, py: 1}}>
                    {productDTO.images.map((img, idx) => (
                        <Box
                            key={idx}
                            onClick={() => setSelectedImage(img.imageUrl)}
                            sx={{
                                width: 48,
                                height: 48,
                                mr: 1,
                                borderRadius: 1,
                                border: selectedImage === img.imageUrl ? '2px solid #1976d2' : '1px solid #ccc',
                                overflow: 'hidden',
                                flexShrink: 0,
                                cursor: 'pointer'
                            }}
                        >
                            <img
                                src={img.imageUrl}
                                alt={img.altText || productDTO.name}
                                style={{width: '100%', height: '100%', objectFit: 'cover'}}
                            />
                        </Box>
                    ))}
                </Box>

                <CardContent sx={{px: 2, py: 1}}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>{productDTO.name}</Typography>
                    <Typography variant="subtitle2" color="primary"
                                gutterBottom>${productDTO.costPrice.toFixed(2)}</Typography>

                    <Typography variant="body2"><strong>Category:</strong> {productDTO.categoryName}</Typography>
                    <Typography variant="body2"><strong>Brand:</strong> {productDTO.brandName}</Typography>
                    <Typography variant="body2"><strong>Supplier:</strong> {productDTO.supplierName}</Typography>
                    <Typography variant="body2"><strong>Stock:</strong> {productDTO.stock.quantity} units</Typography>
                    <Typography variant="body2"
                                gutterBottom><strong>Warehouse:</strong> {productDTO.stock.warehouse.address}
                    </Typography>

                    {productDTO.description && (
                        <>
                            <Divider sx={{my: 1}}/>
                            <Typography variant="subtitle2">Description</Typography>
                            <Typography variant="body2" color="text.secondary">{productDTO.description}</Typography>
                        </>
                    )}

                    {productDTO.productAttributes.length > 0 && (
                        <>
                            <Divider sx={{my: 1}}/>
                            <Typography variant="subtitle2">Attributes</Typography>
                            {productDTO.productAttributes.map((attr, idx) => (
                                <Typography variant="body2" key={idx}>
                                    <strong>{attr.attributeName}:</strong> {attr.attributeValue}
                                </Typography>
                            ))}
                        </>
                    )}

                    <Box sx={{mt: 2, display: 'flex', gap: 1}}>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={() => navigate(`/products/update/${productDTO.id}`)}
                            fullWidth
                        >
                            Update
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            size="medium"
                            disabled={isSubmitting}
                            onClick={() => handleDelete(Number(id))}
                            fullWidth
                        >
                            {isSubmitting ? <CircularProgress size={16} color="inherit"/> : 'Delete'}
                        </Button>
                    </Box>
                    <Button
                        variant="outlined"
                        size="medium"
                        fullWidth
                        sx={{mt: 1}}
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
                onClose={() => setSnackbarOpen(false)}
            />
        </Container>
    );
};

export default ProductPage;
