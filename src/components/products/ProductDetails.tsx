import React from 'react';
import {Grid, TextField} from "@mui/material";
import {NumericFormat} from "react-number-format";
import {ProductDTO} from "../../types/ProductDTO.ts";

interface ProductDetailsProps {
    product: ProductDTO;
    onChange: (name: keyof ProductDTO, value: string | number) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({product, onChange}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange(name as keyof ProductDTO, name === "price" ? Number(value) : value);
    };

    return (
        <>
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
                        const { floatValue } = values;
                        onChange('price', floatValue ?? 0);
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
        </>
    );
};

export default ProductDetails;
