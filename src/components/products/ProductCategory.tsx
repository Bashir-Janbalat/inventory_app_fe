import {FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import React from "react";
import {ProductDTO} from "../../types/ProductDTO";
import {CategoryDTO} from "../../types/CategoryDTO.ts";

interface ProductCategoryProps {
    product: ProductDTO;
    categories: CategoryDTO[];
    onChange: (field: keyof ProductDTO, value: string) => void;
}

const ProductCategory: React.FC<ProductCategoryProps> = ({product, categories, onChange}) => {

    const handleCategoryChange = (e: SelectChangeEvent<string>) => {
        const selectedId = e.target.value;
        onChange('categoryID', selectedId);
    };

    return (
        <>
            <Grid size={{xs: 12, sm: 6}}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={product?.categoryID?.toString() || ""}
                        label="Category"
                        onChange={handleCategoryChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        {categories.map((s) => (
                            <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </>
    );
};

export default ProductCategory;
