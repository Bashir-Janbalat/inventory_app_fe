import React, {ChangeEvent, useEffect, useState} from "react";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select, Stack,
    TextField,
    Typography
} from "@mui/material";
import {ProductDTO} from "../../types/ProductDTO.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import {SupplierDTO} from "../../types/SupplierDTO.ts";
import {useFetcher} from "../../hooks/useFetcher.ts";
import {getCategories, getCategorySize} from "../../api/CategoryApi.ts";
import {getBrands, getBrandSize} from "../../api/BrandApi.ts";
import {getSuppliers, getSupplierSize} from "../../api/SupplierApi.ts";
import Loading from "../base/Loading.tsx";
import {ErrorMessage} from "../common/ErrorMessage.tsx";
import {BrandDTO} from "../../types/BrandDTO.ts";
import {CategoryDTO} from "../../types/CategoryDTO.ts";
import {useNavigate} from "react-router-dom";
import {createProduct} from "../../api/ProductApi.ts";
import {NumericFormat} from "react-number-format";

const initialProduct: ProductDTO = {
    name: "",
    sku: "",
    price: 0,
    images: [],
    productAttributes: [],
    stock: {
        quantity: 0,
        warehouse: {name: "", address: ""}
    },
    supplierName: "",
};

const CreateProduct: React.FC = () => {
    const [product, setProduct] = useState<ProductDTO>(initialProduct);
    const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);
    const [brands, setBrands] = useState<BrandDTO[]>([]);
    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);

    const {fetchData: fetchInitialData, loading: initialDataLoading, error: initialDataError} = useFetcher(
        async () => {
            const [categorySize, brandSize, supplierSize] = await Promise.all([
                getCategorySize(),
                getBrandSize(),
                getSupplierSize(),
            ]);
            const [categoriesResponse, brandsResponse, suppliersResponse] = await Promise.all([
                getCategories(0, categorySize === 0 ? 1 : categorySize),
                getBrands(0, brandSize === 0 ? 1 : brandSize),
                getSuppliers(0, supplierSize === 0 ? 1 : supplierSize),
            ]);
            setCategories(categoriesResponse.content);
            setBrands(brandsResponse.content);
            setSuppliers(suppliersResponse.content);
            return {
                categories: categoriesResponse.content,
                brands: brandsResponse.content,
                suppliers: suppliersResponse.content,
            };
        });

    useEffect(() => {
        fetchInitialData();
    }, []);
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: name === "price" ? parseFloat(value) : value
        }));
    };

    const handleAttributeChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const updatedAttributes = [...product.productAttributes];
        updatedAttributes[index] = {
            ...updatedAttributes[index],
            [name]: value
        };
        setProduct((prev) => ({
            ...prev,
            productAttributes: updatedAttributes
        }));
    };

    const handleImageChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const updatedImages = [...product.images];
        updatedImages[index] = {
            ...updatedImages[index],
            [name]: value
        };
        setProduct((prev) => ({
            ...prev,
            images: updatedImages
        }));
    };

    const addAttribute = () => {
        setProduct((prev) => ({
            ...prev,
            productAttributes: [...prev.productAttributes, {attributeName: "", attributeValue: "", isInitial: false}]
        }));
    };
    const handleDeleteAttribute = (index: number) => {
        const updatedAttributes = product.productAttributes.filter((_, i) => i !== index);
        setProduct({...product, productAttributes: updatedAttributes});
    };

    const addImage = () => {
        setProduct((prev) => ({
            ...prev,
            images: [...prev.images, {imageUrl: "", altText: ""}]
        }));
    };
    const handleDeleteImage = (index: number) => {
        const updatedImages = product.images.filter((_, i) => i !== index);
        setProduct({...product, images: updatedImages});
    };


    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            const status = await createProduct(product);
            if (status === 201) {
                navigate("/products");
            }
        } catch (err) {
            if (err instanceof Error) {
                setCreateError(err.message);
            } else {
                setCreateError("An unexpected error occurred.");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    if (initialDataLoading) {
        return <Loading fullScreen message="Loading ..."/>;
    }
    if (initialDataError) {
        return <ErrorMessage message={initialDataError} onRetry={() => {
            fetchInitialData();
        }}/>;
    }
    return (
        <Box sx={{p: 2}} border={1} borderRadius={2} borderColor="primary.main">
            <Typography variant="h5" gutterBottom>
                Create Product
            </Typography>

            <Grid container spacing={2}>
                {/* Basic Fields */}
                <Grid size={{xs: 12, sm: 6, md: 4}}>
                    <TextField
                        label="Product Name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>

                <Grid size={{xs: 12, sm: 6, md: 4}}>
                    <TextField
                        label="SKU"
                        name="sku"
                        value={product.sku}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>

                <Grid size={{xs: 12, sm: 6, md: 4}}>
                    <NumericFormat
                        customInput={TextField}
                        label="Price"
                        name="price"
                        value={product.price}
                        onValueChange={(values) => {
                            const {floatValue} = values;
                            setProduct(prev => ({
                                ...prev,
                                price: floatValue ?? 0,
                            }));
                        }}
                        thousandSeparator=","
                        decimalSeparator="."
                        decimalScale={2}
                        fixedDecimalScale
                        fullWidth
                    />
                </Grid>

                <Grid size={{xs: 12}}>
                    <TextField
                        label="Description"
                        name="description"
                        value={product.description || ""}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                    />
                </Grid>

                {/* Stock Section */}
                <Grid size={{xs: 12, sm: 6}}>
                    <TextField
                        label="Stock Quantity"
                        name="quantity"
                        type="number"
                        value={product.stock.quantity}
                        onChange={(e) =>
                            setProduct((prev) => ({
                                ...prev,
                                stock: {
                                    ...prev.stock,
                                    quantity: parseInt(e.target.value) || 0
                                }
                            }))
                        }
                        fullWidth
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <TextField
                        label="Warehouse Name"
                        name="WarehouseName"
                        value={product.stock.warehouse.name}
                        onChange={(e) =>
                            setProduct((prev) => ({
                                ...prev,
                                stock: {
                                    ...prev.stock,
                                    warehouse: {
                                        ...prev.stock.warehouse,
                                        name: e.target.value,
                                    },
                                },
                            }))
                        }
                        fullWidth
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <TextField
                        label="Warehouse address"
                        name="WarehouseAddress"
                        value={product.stock.warehouse.address}
                        onChange={(e) =>
                            setProduct((prev) => ({
                                ...prev,
                                stock: {
                                    ...prev.stock,
                                    warehouse: {
                                        ...prev.stock.warehouse,
                                        address: e.target.value,
                                    },
                                },
                            }))
                        }
                        fullWidth
                    />
                </Grid>
                {/* Supplier */}
                <Grid size={{xs: 12, sm: 6}}>
                    <FormControl fullWidth>
                        <InputLabel>Supplier</InputLabel>
                        <Select
                            value={product.supplierID ?? ""}
                            label="Supplier"
                            onChange={(e) =>
                                setProduct((prev) => ({
                                    ...prev,
                                    supplierID: e.target.value === "" ? undefined : Number(e.target.value)
                                }))
                            }
                        >
                            <MenuItem value="">All</MenuItem>
                            {suppliers.map((s) => (
                                <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {/* Category */}
                <Grid size={{xs: 12, sm: 6}}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={product.categoryID ?? ""}
                            label="Category"
                            onChange={(e) =>
                                setProduct((prev) => ({
                                    ...prev,
                                    categoryID: e.target.value === "" ? undefined : Number(e.target.value)
                                }))
                            }
                        >
                            <MenuItem value="">All</MenuItem>
                            {categories.map((s) => (
                                <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {/* Brand */}
                <Grid size={{xs: 12, sm: 6}}>
                    <FormControl fullWidth>
                        <InputLabel>Brand</InputLabel>
                        <Select
                            value={product.brandID ?? ""}
                            label="Brand"
                            onChange={(e) =>
                                setProduct((prev) => ({
                                    ...prev,
                                    brandID: e.target.value === "" ? undefined : Number(e.target.value)
                                }))
                            }
                        >
                            <MenuItem value="">All</MenuItem>
                            {brands.map((s) => (
                                <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {/* Attributes Section */}
                <Grid size={{xs: 12}}>
                    {product.productAttributes.map((attr, index) => (
                        <Grid container spacing={1} key={index}>
                            <Grid size={{xs: 12, sm: 6}}>
                                <TextField
                                    label="Attribute Name"
                                    name="attributeName"
                                    value={attr.attributeName}
                                    onChange={(e) => handleAttributeChange(index, e)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid size={{xs: 12, sm: 6}}>
                                <TextField
                                    label="Attribute Value"
                                    name="attributeValue"
                                    value={attr.attributeValue}
                                    onChange={(e) => handleAttributeChange(index, e)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid size={{xs: 12, sm: 6}}>
                                <IconButton onClick={() => handleDeleteAttribute(index)} color="error" sx={{mt: 2}}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                    <Button variant="outlined" onClick={addAttribute}>
                        Add Attribute
                    </Button>
                </Grid>

                {/* Images Section */}
                <Grid size={{xs: 12}}>
                    {product.images.map((img, index) => (
                        <Grid container spacing={1} key={index}>
                            <Grid size={{xs: 12, sm: 6}}>
                                <TextField
                                    label="Image URL"
                                    name="imageUrl"
                                    value={img.imageUrl}
                                    onChange={(e) => handleImageChange(index, e)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid size={{xs: 12, sm: 6}}>
                                <TextField
                                    label="Alt Text"
                                    name="altText"
                                    value={img.altText}
                                    onChange={(e) => handleImageChange(index, e)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid size={{xs: 12, sm: 6}}>
                                <IconButton onClick={() => handleDeleteImage(index)} color="error" sx={{mt: 2}}>
                                    <DeleteIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                    <Button variant="outlined" onClick={addImage}>
                        Add Image
                    </Button>
                </Grid>

                <Grid  size={{xs:12}}>
                    <Stack spacing={2} mt={4} alignItems="center">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleSubmit()}
                            disabled={isSubmitting}
                            fullWidth
                        >
                            {isSubmitting ? (
                                <>
                                    <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                                    Creating...
                                </>
                            ) : (
                                'Create Product'
                            )}
                        </Button>

                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => navigate(-1)}
                            fullWidth
                        >
                            Back
                        </Button>
                        {createError && (
                            <Alert severity="error">{createError}</Alert>
                        )}
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
        ;
};

export default CreateProduct;
