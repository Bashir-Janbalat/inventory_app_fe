import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useFetchInitialData from '../../hooks/useFetchInitialProductData';
import {createProduct, updateProduct} from '../../api/ProductApi';
import {Alert, Button, CircularProgress, Grid} from "@mui/material";
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

const ProductForm = ({isEdit = false}: { isEdit?: boolean }) => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const options = {
        loadCategories: true,
        loadBrands: true,
        loadSuppliers: true,
        loadWarehouses: true,
        loadProduct: isEdit,
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
    } = useFetchInitialData(id, options);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const [formData, setFormData] = useState<ProductDTO>({
        name: '',
        sku: '',
        description: '',
        price: 0,
        images: [],
        productAttributes: [],
        stock: {quantity: 0, warehouse: {name: '', address: ''}},
    });

    useEffect(() => {
        if (isEdit && id && !product) {
            fetchInitialData().catch(console.error);
        }
    }, [isEdit, id, fetchInitialData, product]);

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
            if (isEdit && id) {
                await updateProduct(Number(id), formData);
            } else {
                await createProduct(formData);
            }
            navigate('/products');
        } catch (err) {
            if (err instanceof Error) {
                setErr(err.message);
            } else {
                setErr("An unexpected error occurred.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <Loading fullScreen message="Loading..."/>;
    if (error) return <ErrorMessage message={error} onRetry={fetchInitialData}/>;

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <ProductDetails product={formData} onChange={handleFormChange}/>
                <ProductStock product={formData} warehouses={warehouses} onChange={handleFormChange}/>
                <ProductSupplier product={formData} suppliers={suppliers} onChange={handleFormChange}/>
                <ProductCategory product={formData} categories={categories} onChange={handleFormChange}/>
                <ProductBrand product={formData} brands={brands} onChange={handleFormChange}/>
                <ProductImages product={formData} onChange={handleFormChange}/>
                <ProductAttributes product={formData} onChange={handleFormChange}/>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{mt: 4, py: 1.5, fontSize: '16px'}}
                    fullWidth
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <CircularProgress size={24} color="inherit"/>
                    ) : isEdit ? (
                        'Update Product'
                    ) : (
                        'Create Product'
                    )}
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    sx={{mt: 1, py: 1.5, fontSize: '16px'}}
                    fullWidth
                >
                    Back
                </Button>
                {err && (
                    <Alert severity="error">{err}</Alert>
                )}
            </Grid>
        </form>
    );
};

export default ProductForm;
