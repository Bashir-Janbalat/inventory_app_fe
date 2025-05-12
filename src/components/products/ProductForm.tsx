import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import createFetcher from '../../hooks/useProductFormData.ts';
import {createProduct, updateProduct} from '../../api/ProductApi';
import {Box, Button, CircularProgress, Grid, Tab, Tabs} from "@mui/material";
import Loading from "../base/Loading.tsx";
import {ErrorMessage} from "../common/ErrorMessage.tsx";
import ProductDetails from "./ProductDetails.tsx";
import {ProductDTO, StockDTO} from "../../types/ProductDTO.ts";
import ProductStock from "./ProductStock.tsx";
import ProductSupplier from "./ProductSupplier.tsx";
import ProductCategory from "./ProductCategory.tsx";
import ProductBrand from "./ProductBrand.tsx";
import ProductImages from "./ProductImages.tsx";
import ProductAttributes from "./ProductAttributes.tsx";
import {DetailedApiError} from "../../errors/DetailedApiError.ts";
import CustomSnackbar from "../common/CustomSnackbar.tsx";

const ProductForm = ({mode = 'create'}: { mode?: 'create' | 'update' }) => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0);
    const options = {
        loadCategories: true,
        loadBrands: true,
        loadSuppliers: true,
        loadWarehouses: true,
        loadProduct: mode !== 'create',
    };
    const {
        fetchData: fetchInitialData,
        loading,
        error,
        categories,
        brands,
        suppliers,
        warehouses,
        product
    } = createFetcher(id, options);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<ProductDTO>({
        name: '',
        sku: '',
        description: '',
        costPrice: 0,
        images: [],
        productAttributes: [],
        stock: {quantity: 0, warehouse: {name: '', address: ''}, movementType: ''},
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

    useEffect(() => {
        fetchInitialData().catch(console.error);
    }, [mode, id, fetchInitialData]);

    useEffect(() => {
        if (product) {
            setFormData(product);
        }
    }, [product]);

    const handleFormChange = (field: keyof ProductDTO, value: string | number | StockDTO | ProductDTO['images'] | ProductDTO['productAttributes']) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (mode === 'update' && id) {
                await updateProduct(Number(id), formData);
                setSnackbarMessage('Product Update successfully!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            } else {
                await createProduct(formData);
                setSnackbarMessage('Create Update successfully!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            }
            navigate('/products');
        } catch (err) {
            if (err instanceof DetailedApiError) {
                setSnackbarMessage(err.message);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            } else {
                throw error;
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <Loading fullScreen message="Loading..."/>;
    if (error) return <ErrorMessage message={error} onRetry={fetchInitialData}/>;
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };
    return (
        <form onSubmit={handleSubmit}>
            <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
                <Tab label="Details"/>
                <Tab label="Stock"/>
                <Tab label="Supplier"/>
                <Tab label="Category"/>
                <Tab label="Brand"/>
                <Tab label="Images"/>
                <Tab label="Attributes"/>
            </Tabs>

            <Box mt={2}>
                <Grid container spacing={2}>
                    {tabIndex === 0 && <ProductDetails product={formData} onChange={handleFormChange}/>}
                    {tabIndex === 1 && (
                        <ProductStock
                            product={formData}
                            warehouses={warehouses}
                            onChange={handleFormChange}
                            mode={mode}
                        />
                    )}
                    {tabIndex === 2 && (
                        <ProductSupplier product={formData} suppliers={suppliers} onChange={handleFormChange}/>
                    )}
                    {tabIndex === 3 && (
                        <ProductCategory product={formData} categories={categories} onChange={handleFormChange}/>
                    )}
                    {tabIndex === 4 && (
                        <ProductBrand product={formData} brands={brands} onChange={handleFormChange}/>
                    )}
                    {tabIndex === 5 && <ProductImages product={formData} onChange={handleFormChange}/>}
                    {tabIndex === 6 && <ProductAttributes product={formData} onChange={handleFormChange}/>}
                </Grid>
            </Box>

            <Box mt={4}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <CircularProgress size={24}
                                                      color="inherit"/> : mode === 'update' ? 'Update Product' : 'Create Product'}
                </Button>

                <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    sx={{mt: 1}}
                    fullWidth
                >
                    Back
                </Button>
            </Box>
            <CustomSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={handleSnackbarClose}
            />
        </form>
    );
};

export default ProductForm;
