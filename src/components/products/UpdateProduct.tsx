import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getProductById, updateProduct } from "../../api/ProductApi";
import { ProductDTO } from "../../types/ProductDTO";
import { useFetcher } from "../../hooks/useFetcher";
import { Container, Stack, TextField, Button, MenuItem, Typography, IconButton } from "@mui/material";
import Loading from "../base/Loading";
import { ErrorMessage } from "../common/ErrorMessage";
import { getCategories, getCategorySize } from "../../api/CategoryApi";
import { getBrands, getBrandSize } from "../../api/BrandApi";
import { getSuppliers, getSupplierSize } from "../../api/SupplierApi";
import { Delete } from "@mui/icons-material";
import {BrandDTO} from "../../types/BrandDTO.ts";
import {SupplierDTO} from "../../types/SupplierDTO.ts";
import {CategoryDTO} from "../../types/CategoryDTO.ts"; // Icon zum Löschen

const UpdateProduct = () => {
    const { id } = useParams<{ id: string }>();
    const parsedId = id ? parseInt(id, 10) : undefined;

    const [product, setProduct] = useState<ProductDTO>({
        name: "",
        sku: "",
        description: "",
        price: 0,
        images: [],
        productAttributes: [],
        stock: {
            quantity: 0,
            warehouse: {
                name: "",
                address: ""
            }
        }
    });

    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const [brands, setBrands] = useState<BrandDTO[]>([]);
    const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);

    const { fetchData: fetchInitialData, loading: initialDataLoading, error: initialDataError } = useFetcher(
        async () => {
            if (parsedId === undefined) throw new Error("No ID provided!");

            const [categorySize, brandSize, supplierSize] = await Promise.all([
                getCategorySize(),
                getBrandSize(),
                getSupplierSize()
            ]);

            const [categoriesResponse, brandsResponse, suppliersResponse, productResponse] = await Promise.all([
                getCategories(0, categorySize || 1),
                getBrands(0, brandSize || 1),
                getSuppliers(0, supplierSize || 1),
                getProductById(parsedId)
            ]);

            setCategories(categoriesResponse.content);
            setBrands(brandsResponse.content);
            setSuppliers(suppliersResponse.content);
            setProduct(productResponse);
        }
    );

    useEffect(() => {
        fetchInitialData();
    }, []);

    if (!parsedId) return <div>No ID provided!</div>;
    if (initialDataLoading) return <Loading fullScreen message="Loading product..." />;
    if (initialDataError) return <ErrorMessage message={initialDataError} onRetry={fetchInitialData} />;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value
        }));
    };

    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            stock: {
                ...prev.stock,
                [name]: name === "quantity" ? Number(value) : value
            }
        }));
    };

    const handleImageChange = (index: number, field: string, value: string) => {
        const updatedImages = [...product.images];
        updatedImages[index] = { ...updatedImages[index], [field]: value };
        setProduct(prev => ({ ...prev, images: updatedImages }));
    };

    const addImage = () => {
        setProduct(prev => ({
            ...prev,
            images: [...prev.images, { imageUrl: "", altText: "" }]
        }));
    };

    const removeImage = (index: number) => {
        const updatedImages = product.images.filter((_, i) => i !== index);
        setProduct(prev => ({ ...prev, images: updatedImages }));
    };

    const handleAttributeChange = (index: number, field: string, value: string) => {
        const updatedAttributes = [...product.productAttributes];
        updatedAttributes[index] = { ...updatedAttributes[index], [field]: value };
        setProduct(prev => ({ ...prev, productAttributes: updatedAttributes }));
    };

    const addAttribute = () => {
        setProduct(prev => ({
            ...prev,
            productAttributes: [...prev.productAttributes, { attributeName: "", attributeValue: "" }]
        }));
    };

    const removeAttribute = (index: number) => {
        const updatedAttributes = product.productAttributes.filter((_, i) => i !== index);
        setProduct(prev => ({ ...prev, productAttributes: updatedAttributes }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log(product);
            await updateProduct(parsedId, product);
        } catch (error) {
            console.error(error);
            alert("Failed to update product.");
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <Typography variant="h4">Update Product</Typography>

                    <TextField label="Name" name="name" value={product.name} onChange={handleChange} fullWidth required />
                    <TextField label="SKU" name="sku" value={product.sku} onChange={handleChange} fullWidth required />
                    <TextField label="Description" name="description" value={product.description || ""} onChange={handleChange} fullWidth multiline rows={4} />
                    <TextField label="Price" name="price" type="number" value={product.price} onChange={handleChange} fullWidth required />

                    {/* Category */}
                    <TextField select label="Category" name="categoryID" value={product.categoryID || ""} onChange={handleChange} fullWidth>
                        {categories.map((category: any) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Brand */}
                    <TextField select label="Brand" name="brandID" value={product.brandID || ""} onChange={handleChange} fullWidth>
                        {brands.map((brand: any) => (
                            <MenuItem key={brand.id} value={brand.id}>
                                {brand.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Supplier */}
                    <TextField select label="Supplier" name="supplierID" value={product.supplierID || ""} onChange={handleChange} fullWidth>
                        {suppliers.map((supplier: any) => (
                            <MenuItem key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Stock */}
                    <Typography variant="h6">Stock</Typography>
                    <TextField label="Quantity" name="quantity" type="number" value={product.stock?.quantity || 0} onChange={handleStockChange} fullWidth />
                    <TextField label="Warehouse Name" name="name" value={product.stock?.warehouse?.name || ""} onChange={handleStockChange} fullWidth />
                    <TextField label="Warehouse Address" name="address" value={product.stock?.warehouse?.address || ""} onChange={handleStockChange} fullWidth />

                    {/* Images Section */}
                    <Typography variant="h6">Images</Typography>
                    {product.images.map((image, index) => (
                        <Stack direction="row" spacing={2} alignItems="center" key={index}>
                            <TextField
                                label="Image URL"
                                value={image.imageUrl}
                                onChange={(e) => handleImageChange(index, "imageUrl", e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Alt Text"
                                value={image.altText}
                                onChange={(e) => handleImageChange(index, "altText", e.target.value)}
                                fullWidth
                            />
                            <IconButton onClick={() => removeImage(index)} color="error">
                                <Delete />
                            </IconButton>
                        </Stack>
                    ))}
                    <Button onClick={addImage} variant="outlined">
                        Add Image
                    </Button>

                    {/* Attributes Section */}
                    <Typography variant="h6">Product Attributes</Typography>
                    {product.productAttributes.map((attribute, index) => (
                        <Stack direction="row" spacing={2} alignItems="center" key={index}>
                            <TextField
                                label="Attribute Name"
                                value={attribute.attributeName}
                                onChange={(e) => handleAttributeChange(index, "attributeName", e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Attribute Value"
                                value={attribute.attributeValue}
                                onChange={(e) => handleAttributeChange(index, "attributeValue", e.target.value)}
                                fullWidth
                            />
                            <IconButton onClick={() => removeAttribute(index)} color="error">
                                <Delete />
                            </IconButton>
                        </Stack>
                    ))}
                    <Button onClick={addAttribute} variant="outlined">
                        Add Attribute
                    </Button>

                    <Button type="submit" variant="contained" color="primary">
                        Update Product
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default UpdateProduct;
