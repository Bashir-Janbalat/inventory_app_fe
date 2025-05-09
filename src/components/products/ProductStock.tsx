import { ProductDTO, WarehouseDTO } from "../../types/ProductDTO.ts";
import {FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import React from "react";

interface ProductStockProps {
    product: ProductDTO;
    warehouses: WarehouseDTO[];
    onChange: (field: keyof ProductDTO, value: ProductDTO['stock']) => void;
}

const ProductStock: React.FC<ProductStockProps> = ({ product, warehouses, onChange }) => {
    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange('stock', {
            ...product.stock,
            [name]: name === "quantity" ? Number(value) : value,
        });
    };

    const handleWarehouseChange = (e: SelectChangeEvent<string>) => {
        const selectedId = Number(e.target.value);
        const selectedWarehouse = warehouses.find((w) => w.id === selectedId);

        if (selectedWarehouse) {
            onChange('stock', {
                ...product.stock,
                warehouse: {
                    id: selectedWarehouse.id,
                    name: selectedWarehouse.name,
                    address: selectedWarehouse.address,
                }
            });
        }
    };

    return (
        <>
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
                <FormControl fullWidth>
                    <InputLabel id="warehouses-label">Warehouses</InputLabel>
                    <Select
                        labelId="warehouses-label"
                        value={product.stock.warehouse?.id ? String(product.stock.warehouse.id) : ''}
                        label="Warehouses"
                        onChange={handleWarehouseChange}
                    >
                        <MenuItem value="">None</MenuItem>
                        {warehouses.map((warehouse) => (
                            <MenuItem key={warehouse.id} value={warehouse.id}>
                                {warehouse.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </>
    );
};

export default ProductStock;
