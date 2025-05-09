
import {FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import React from "react";
import {SupplierDTO} from "../../types/SupplierDTO";
import {ProductDTO} from "../../types/ProductDTO";

interface ProductSupplierProps {
    product: ProductDTO;
    suppliers: SupplierDTO[];
    onChange: (field: keyof ProductDTO, value: string ) => void;
}

const ProductSupplier: React.FC<ProductSupplierProps> = ({ product, suppliers, onChange }) => {

    const handleSupplierChange = (e: SelectChangeEvent<string>) => {
        const selectedId = e.target.value;
        onChange('supplierID', selectedId);
    };

    return (
        <>
            <Grid size={{xs:12, sm: 6}}>
                <FormControl fullWidth>
                    <InputLabel>Supplier</InputLabel>
                    <Select
                        value={product?.supplierID?.toString() || ""}
                        label="Supplier"
                        onChange={handleSupplierChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        {suppliers.map((s) => (
                            <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </>
    );
};

export default ProductSupplier;
