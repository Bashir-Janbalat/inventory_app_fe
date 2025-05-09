import {FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import React from "react";
import {ProductDTO} from "../../types/ProductDTO";
import {BrandDTO} from "../../types/BrandDTO";

interface ProductBrandProps {
    product: ProductDTO;
    brands: BrandDTO[];
    onChange: (field: keyof ProductDTO, value: string) => void;
}

const ProductBrand: React.FC<ProductBrandProps> = ({product, brands, onChange}) => {

    const handleBrandChange = (e: SelectChangeEvent<string>) => {
        const selectedId = e.target.value;
        onChange('brandID', selectedId);
    };

    return (
        <>
            <Grid size={{xs: 12, sm: 6}}>
                <FormControl fullWidth>
                    <InputLabel>Brand</InputLabel>
                    <Select
                        value={product?.brandID?.toString() || ""}
                        label="Brand"
                        onChange={handleBrandChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        {brands.map((s) => (
                            <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </>
    );
};

export default ProductBrand;
