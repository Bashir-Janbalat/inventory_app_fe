import {useNavigate, useParams} from "react-router-dom";
import {createProduct, getProductById, updateProduct} from "../../api/ProductApi";
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
    Select,
    TextField
} from "@mui/material";
import {NumericFormat} from "react-number-format";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {ChangeEvent, useEffect, useState} from "react";
import {ProductDTO} from "../../types/ProductDTO";
import {BrandDTO} from "../../types/BrandDTO.ts";
import {SupplierDTO} from "../../types/SupplierDTO";
import {CategoryDTO} from "../../types/CategoryDTO";
import {getCategories, getCategorySize} from "../../api/CategoryApi";
import {getBrands, getBrandSize} from "../../api/BrandApi";
import {getSuppliers, getSupplierSize} from "../../api/SupplierApi";
import {useFetcher} from "../../hooks/useFetcher";
import Loading from "../base/Loading";
import {ErrorMessage} from "./ErrorMessage";

const ProductForm = ({isEdit = false}: { isEdit?: boolean }) => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const [brands, setBrands] = useState<BrandDTO[]>([]);
    const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const [product, setProduct] = useState<ProductDTO>({
        name: "",
        sku: "",
        description: "",
        price: 0,
        images: [],
        productAttributes: [],
        stock: {
            quantity: 0, warehouse: {name: "", address: ""}
        }
    });
    const {fetchData: fetchInitialData, loading: initialDataLoading, error: initialDataError} = useFetcher(
        async () => {
            const [categorySize, brandSize, supplierSize] = await Promise.all([
                getCategorySize(),
                getBrandSize(),
                getSupplierSize()
            ]);

            const [categoriesResponse, brandsResponse, suppliersResponse] = await Promise.all([
                getCategories(0, categorySize || 1),
                getBrands(0, brandSize || 1),
                getSuppliers(0, supplierSize || 1),
            ]);

            setCategories(categoriesResponse.content);
            setBrands(brandsResponse.content);
            setSuppliers(suppliersResponse.content);
        }
    );


    const {fetchData: fetchProduct, loading: productLoading, error: productFetchingError} = useFetcher(
        async () => {
            if (isEdit && id) {
                const productResponse = await getProductById(Number(parseInt(id, 10)));
                setProduct({
                    ...productResponse,
                    productAttributes: productResponse.productAttributes.map((attr) => ({
                        ...attr,
                        isInitial: true
                    }))
                });
            }
        }
    );

    useEffect(() => {
        fetchInitialData();
        fetchProduct();
    }, [isEdit, id]);

    if (initialDataLoading || productLoading) return <Loading fullScreen message="Loading..."/>;
    if (initialDataError) return <ErrorMessage message={initialDataError} onRetry={fetchInitialData}/>;
    if (productFetchingError) return <ErrorMessage message={productFetchingError} onRetry={fetchProduct}/>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value
        }));
    };
    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setProduct((prev) => ({
            ...prev,
            stock: {
                ...prev.stock,
                [name]: name === "quantity" ? Number(value) : value
            }
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

    const addImage = () => {
        setProduct((prev) => ({
            ...prev,
            images: [...prev.images, {imageUrl: "", altText: ""}]
        }));
    };

    const handleDeleteImage = (index: number) => {
        const updatedImages = product.images.filter((_, i) => i !== index);
        setProduct((prev) => ({...prev, images: updatedImages}));
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (isEdit && id) {
                await updateProduct(Number(id), product);
            } else {
                await createProduct(product);
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
    return (
        <Box sx={{p: 2}} border={1} borderRadius={2} borderColor="primary.main">
            <form onSubmit={handleSubmit}>

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
                            onChange={handleStockChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={{xs: 12, sm: 6}}>
                        <TextField
                            label="Warehouse Name"
                            name="name"
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
                            name="address"
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
                    {/* Attributes Section */}
                    <Grid size={{xs: 12}}>
                        {product.productAttributes.map((attr, index) => (
                            <Grid container spacing={1} key={index}>
                                <Grid size={{xs: 12, sm: 6}}>
                                    <TextField
                                        disabled={attr.isInitial}
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
                    {/* Buttons and Error */}
                    <Grid size={{xs: 12}}>
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
                            sx={{mt: 4, py: 1.5, fontSize: '16px'}}
                            fullWidth
                        >
                            Back
                        </Button>
                        {err && (
                            <Alert severity="error">{err}</Alert>
                        )}
                    </Grid>
                </Grid>
            </form>
        </Box>
    );

}
export default ProductForm;