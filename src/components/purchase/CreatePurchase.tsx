import React, {useCallback, useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Grow,
    IconButton,
    MenuItem,
    TextField,
    Typography
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {PurchaseItemDTO, PurchaseProductDTO} from "../../types/PurchaseDTO.ts";
import createFetcher from "../../hooks/useProductFormData.ts";
import Loading from "../base/Loading.tsx";
import {ErrorMessage} from "../common/ErrorMessage.tsx";
import {useFetcher} from "../../hooks/useFetcher.ts";
import {createPurchase, getProductsForSupplier} from "../../api/PurchaseApi.ts";
import {useNavigate} from 'react-router-dom';
import CustomSnackbar from "../common/CustomSnackbar.tsx";


const CreatePurchase: React.FC = () => {
    const [supplierId, setSupplierId] = useState<number>();
    const [items, setItems] = useState<PurchaseItemDTO[]>([]);
    const [products, setProducts] = useState<PurchaseProductDTO[]>([]);
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

    const {
        fetchData: loadSuppliers,
        loading: isLoadingSuppliers,
        error: suppliersLoadError,
        suppliers
    } = createFetcher(undefined, {loadSuppliers: true});

    useEffect(() => {
        loadSuppliers().catch(console.error);
    }, [loadSuppliers]);
    useEffect(() => {
        if (suppliers.length > 0 && !supplierId) {
            setSupplierId(Number(suppliers[0].id));
        }
    }, [suppliers, supplierId]);

    const fetchAllProducts = useCallback(async () => {
        const response = await getProductsForSupplier(Number(supplierId));
        setProducts(response);
        return response;
    }, [supplierId]);

    const {
        fetchData: loadProducts,
        loading: isLoadingProducts,
        error: productsLoadError
    } = useFetcher<PurchaseProductDTO[]>(fetchAllProducts);

    useEffect(() => {
        setItems([]);
        if (supplierId) {
            loadProducts().catch(console.error);
        }
    }, [supplierId, loadProducts]);

    const handleAddItem = () => {
        if (products.length === 0) return;

        const defaultProduct = products[0];
        setItems([...items, {
            productName: defaultProduct.productName,
            productId: defaultProduct.productId || '',
            quantity: 0,
            unitPrice: defaultProduct.unitPrice
        }]);
    };

    const handleItemChange = <K extends keyof PurchaseItemDTO>(
        index: number,
        field: K,
        value: PurchaseItemDTO[K]
    ) => {
        const updatedItems = [...items];

        if (field === 'productId') {
            const product = products.find(p => p.productId === Number(value));
            updatedItems[index].productId = Number(value);
            updatedItems[index].unitPrice = product ? product.unitPrice : 0;
        } else {
            updatedItems[index][field] = value;
        }

        setItems(updatedItems);
    };

    const handleDeleteItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };
    const handleSavePurchase = async () => {
        if (!supplierId || items.length === 0) {
            setSnackbarMessage("Please select a supplier and add at least one item.");
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }
        setIsSaving(true);
        try {
            const res = await createPurchase({supplierId, items});

            if (res === 201) {
                setTimeout(() => {
                    navigate("/purchases");
                }, 500);
            }
        } catch (error) {
            console.error("Fehler beim Speichern des Einkaufs:", error);
        } finally {
            setIsSaving(false);
        }
    };
    if (isLoadingSuppliers || isLoadingProducts) {
        return <Loading fullScreen message="Loading..."/>;
    }
    if (suppliersLoadError) {
        return <ErrorMessage message={suppliersLoadError} onRetry={() => {
            void loadSuppliers();
        }}/>;
    }
    if (productsLoadError) {
        return <ErrorMessage message={productsLoadError} onRetry={() => {
            void loadProducts();
        }}/>;
    }
    return (<>
            <Grow in={true} timeout={500}>
                <Card sx={{p: 4, boxShadow: 6, borderRadius: 3}}>
                    <CardHeader
                        title='Create a new Purchase'
                        slotProps={{
                            title: {
                                typography: 'h5',
                                sx: {textAlign: 'center'}
                            }
                        }}
                        sx={{pb: 2}}
                        action={
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<ShoppingCartIcon/>}
                                onClick={() => navigate("/purchases")}
                                sx={{ mr: 2 }}
                            >
                                Purchases
                            </Button>
                        }
                    />
                    <CardContent>

                        <Grid container spacing={2} sx={{mb: 4}}>
                            <Grid size={{xs: 12, sm: 4}}>
                                <TextField
                                    label="Supplier"
                                    select
                                    fullWidth
                                    value={supplierId || ''}
                                    onChange={(e) => setSupplierId(Number(e.target.value))}
                                >
                                    {suppliers.map((supplier) => (
                                        <MenuItem key={supplier.id} value={supplier.id}>
                                            {supplier.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>

                        <Typography variant="h6" gutterBottom>Purchase Items</Typography>

                        {items.map((item, index) => {
                            const total = item.quantity * item.unitPrice;
                            return (
                                <Grid container spacing={2} key={index} alignItems="center" sx={{mb: 2}}>
                                    {/* Product */}
                                    <Grid size={{xs: 12, sm: 3}}>
                                        <TextField
                                            label="Product"
                                            select
                                            fullWidth
                                            value={item.productId}
                                            onChange={(e) =>
                                                handleItemChange(index, 'productId', Number(e.target.value))}>
                                            {products.map((product) => (
                                                <MenuItem key={product.productId} value={product.productId}>
                                                    {product.sku}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    {/* Quantity */}
                                    <Grid size={{xs: 12, sm: 2}}>
                                        <TextField
                                            label="Quantity"
                                            type="number"
                                            fullWidth
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleItemChange(index, 'quantity', parseInt(e.target.value))}
                                        />
                                    </Grid>
                                    {/* Unit Price */}
                                    <Grid size={{xs: 12, sm: 2}}>
                                        <TextField
                                            label="Unit Price"
                                            type="number"
                                            fullWidth
                                            value={item.unitPrice}
                                            onChange={(e) =>
                                                handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                                        />
                                    </Grid>
                                    {/* Total */}
                                    <Grid size={{xs: 12, sm: 2}}>
                                        <TextField
                                            label="Total"
                                            fullWidth
                                            value={total.toFixed(2)}
                                            slotProps={{
                                                input: {
                                                    readOnly: true,
                                                },
                                            }}
                                        />
                                    </Grid>
                                    {/* Delete */}
                                    <Grid size={{xs: 12, sm: 1}}>
                                        <Tooltip title="Delete Item">
                                            <IconButton onClick={() => handleDeleteItem(index)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            );
                        })}


                        <Grid container spacing={2} justifyContent="flex-start" sx={{mt: 4}}>
                            <Grid>
                                <Button
                                    variant="outlined"
                                    startIcon={<AddCircleIcon/>}
                                    onClick={handleAddItem}
                                >
                                    Add Item
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Tooltip title="Save">
                                <Button sx={{mt: 2}}
                                        variant="contained"
                                        startIcon={<SaveIcon/>}
                                        onClick={handleSavePurchase}
                                        disabled={isSaving}
                                        fullWidth
                                >
                                    {isSaving ? 'Saving...' : 'Save'}
                                </Button>
                            </Tooltip>
                        </Grid>
                    </CardContent>
                </Card>
            </Grow>
            <CustomSnackbar
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={() => setSnackbarOpen(false)}
            />
        </>
    );
}

export default CreatePurchase;

