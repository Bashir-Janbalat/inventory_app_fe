import {ProductDTO, WarehouseDTO} from "../../types/ProductDTO.ts";
import {FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import React, {useState} from "react";

interface ProductStockProps {
    product: ProductDTO;
    warehouses: WarehouseDTO[];
    onChange: (field: keyof ProductDTO, value: ProductDTO['stock']) => void;
    mode: 'create' | 'update';
}

const ProductStock: React.FC<ProductStockProps> = ({product, warehouses, onChange, mode}) => {
    const [movementType, setMovementType] = useState("ADJUST");
    const [destinationWarehouseId, setDestinationWarehouseId] = useState<number | undefined>(product.stock?.destinationWarehouseId);

    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        onChange('stock', {
            ...product.stock,
            [name]: name === "quantity" ? Number(value) : value,
        });
    };
    const handleStockMovementQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        onChange('stock', {
            ...product.stock,
            [name]: name === "movementQuantity" ? Number(value) : value,
        });
    };

    const handleWarehouseChange = (e: SelectChangeEvent<string>) => {
        const selectedId = Number(e.target.value);
        const selectedWarehouse = warehouses.find((w) => w.id === selectedId);
        const updatedWarehouse = selectedWarehouse
            ? {
                id: selectedWarehouse.id,
                name: selectedWarehouse.name,
                address: selectedWarehouse.address,
            }
            : {
                name: "",
                address: "",
            };

        onChange('stock', {
            ...product.stock,
            warehouse: updatedWarehouse,
        });
    }
    const handleMovementTypeChange = (e: SelectChangeEvent<string>) => {
        const type = e.target.value;
        setMovementType(type);
        if (type !== 'TRANSFER') {
            setDestinationWarehouseId(undefined);
        }
        onChange('stock', {
            ...product.stock,
            movementType: type,
            destinationWarehouseId: type === 'TRANSFER' ? destinationWarehouseId : undefined,
        });
    };

    const handleDestinationWarehouseChange = (e: SelectChangeEvent<string>) => {
        const selectedId = e.target.value ? Number(e.target.value) : undefined;
        setDestinationWarehouseId(selectedId);

        onChange('stock', {
            ...product.stock,
            destinationWarehouseId: Number(selectedId),
        });
    };
    return (
        <>
            {/* Stock quantity */}
            <Grid size={{xs: 12, sm: 6}}>
                <TextField
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={product.stock.quantity}
                    onChange={handleStockChange}
                    disabled={mode === 'update'}
                    fullWidth
                />
            </Grid>
            {/* Warehouse */}
            <Grid size={{xs: 12, sm: 6}}>
                <FormControl fullWidth>
                    <InputLabel id="warehouses-label">Warehouses</InputLabel>
                    <Select
                        labelId="warehouses-label"
                        value={product.stock.warehouse?.id ? String(product.stock.warehouse.id) : ''}
                        label="Warehouses"
                        onChange={handleWarehouseChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        {warehouses.map((warehouse) => (
                            <MenuItem key={warehouse.id} value={warehouse.id}>
                                {warehouse.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            {/* MovementType */}
            {mode === 'update' && (
                <>
                    <Grid size={{xs: 12, sm: 6}}>
                        <FormControl fullWidth>
                            <InputLabel id="movementType-label">Movement Type</InputLabel>
                            <Select
                                labelId="movementType-label"
                                value={movementType}
                                label="Movement Type"
                                onChange={handleMovementTypeChange}
                            >
                                <MenuItem key="IN" value="IN">IN</MenuItem>
                                <MenuItem key="OUT" value="OUT">OUT</MenuItem>
                                <MenuItem key="RETURN" value="RETURN">RETURN</MenuItem>
                                <MenuItem key="DAMAGED" value="DAMAGED">DAMAGED</MenuItem>
                                <MenuItem key="TRANSFER" value="TRANSFER">TRANSFER</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{xs: 12, sm: 6}}>
                        <TextField
                            label="Quantity Change"
                            name="movementQuantity"
                            type="number"
                            value={product.stock?.movementQuantity ?? ''}
                            onChange={handleStockMovementQuantity}
                            fullWidth
                        />
                    </Grid>
                    {movementType === 'TRANSFER' && (
                        <Grid size={{xs: 12, sm: 6}}>
                            <FormControl fullWidth>
                                <InputLabel id="destinationWarehouse-label">Destination Warehouse</InputLabel>
                                <Select
                                    labelId="destinationWarehouse-label"
                                    value={destinationWarehouseId ? String(destinationWarehouseId) : ''}
                                    onChange={handleDestinationWarehouseChange}
                                    label="Destination Warehouse"
                                >
                                    {warehouses
                                        .filter(w => w.id !== product.stock.warehouse?.id)
                                        .map((warehouse) => (
                                            <MenuItem key={warehouse.id} value={warehouse.id}>
                                                {warehouse.name}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    )}
                </>
            )}
        </>
    );
};

export default ProductStock;
