import {ProductDTO, StockDTO} from "../../types/ProductDTO.ts";
import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import React, {Fragment, useState} from "react";
import {WarehouseDTO} from "../../types/WarehouseDTO.ts";

interface ProductStockProps {
    product: ProductDTO;
    warehouses: WarehouseDTO[];
    onChange: (field: keyof ProductDTO, value: ProductDTO['stocks']) => void;
    mode: 'create' | 'update';
}

const ProductStock: React.FC<ProductStockProps> = ({product, warehouses, onChange, mode}) => {
    const [newStocks, setNewStocks] = useState<Partial<StockDTO>[]>([]);

    const updateStock = (index: number, updatedFields: Partial<StockDTO>) => {
        const updatedStocks = [...product.stocks];
        updatedStocks[index] = {
            ...updatedStocks[index],
            ...updatedFields
        };
        onChange('stocks', updatedStocks);
    };

    const handleAddStock = () => {
        const updated = [...newStocks, {quantity: 0, warehouse: undefined}];
        setNewStocks(updated);
        onChange('stocks', updated as StockDTO[]);
    };

    const handleRemoveStock = (index: number) => {
        const updated = [...newStocks];
        updated.splice(index, 1);
        setNewStocks(updated);
    };
    return (
        <>
            {mode === 'create' && (
                <>
                    {newStocks.map((stock, index) => (
                        <Fragment key={index}>
                            <Grid size={{xs: 12, sm: 6}}>
                                <TextField
                                    id={`quantity-${index}`}
                                    label="Quantity"
                                    type="number"
                                    required
                                    value={stock.quantity ?? ''}
                                    onChange={(e) => {
                                        const updated = [...newStocks];
                                        updated[index].quantity = Number(e.target.value);
                                        setNewStocks(updated);
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid size={{xs: 12, sm: 6}}>
                                <FormControl fullWidth required>
                                    <InputLabel id={`warehouse-label-${index}`}>Warehouse</InputLabel>
                                    <Select
                                        labelId={`warehouse-label-${index}`}
                                        value={stock.warehouse?.id ? String(stock.warehouse.id) : ''}
                                        onChange={(e) => {
                                            const warehouseId = Number(e.target.value);
                                            const selectedWarehouse = warehouses.find(w => w.id === warehouseId);
                                            if (selectedWarehouse) {
                                                const updated = [...newStocks];
                                                updated[index].warehouse = selectedWarehouse;
                                                setNewStocks(updated);
                                            }
                                        }}
                                    >
                                        <MenuItem value="">Select</MenuItem>
                                        {warehouses.map((warehouse) => (
                                            <MenuItem key={warehouse.id} value={warehouse.id}>
                                                {warehouse.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={{xs: 12}}>
                                <Button color="error" variant='outlined' onClick={() => handleRemoveStock(index)}>Remove</Button>
                            </Grid>
                        </Fragment>
                    ))}
                    <Button variant="outlined" onClick={handleAddStock}>+ Add Stock</Button>
                </>
            )}

            {mode === 'update' && (
                product.stocks.map((stock, index) => (
                    <React.Fragment key={index} >
                        <Grid size={{xs: 12, sm: 6}}>
                            <TextField
                                label="Quantity"
                                name="quantity"
                                type="number"
                                value={stock.quantity}
                                slotProps={{
                                    input: {
                                        readOnly: true,
                                    },
                                }}
                                onChange={(e) =>
                                    updateStock(index, {quantity: Number(e.target.value)})
                                }
                                fullWidth
                            />
                        </Grid>

                        <Grid size={{xs: 12, sm: 6}}>
                            <FormControl fullWidth>
                                <InputLabel id={`warehouse-label-${index}`}>Warehouse</InputLabel>
                                <Select
                                    labelId={`warehouse-label-${index}`}
                                    IconComponent={() => null}
                                    value={stock.warehouse?.id ? String(stock.warehouse.id) : ''}
                                    label="Warehouse"
                                    slotProps={{
                                        input: {
                                            readOnly: true,
                                        },
                                    }}
                                    onChange={(e) => {
                                        const warehouseId = Number(e.target.value);
                                        const selectedWarehouse = warehouses.find((w) => w.id === warehouseId);
                                        if (selectedWarehouse) {
                                            updateStock(index, {warehouse: selectedWarehouse});
                                        }
                                    }}
                                >
                                    <MenuItem value="">Select</MenuItem>
                                    {warehouses.map((warehouse) => (
                                        <MenuItem key={warehouse.id} value={warehouse.id}>
                                            {warehouse.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{xs: 12, sm: 6}}>
                            <FormControl fullWidth>
                                <InputLabel id={`movementType-label-${index}`}>Movement Type</InputLabel>
                                <Select
                                    labelId={`movementType-label-${index}`}
                                    value={stock.movementType ?? ''}
                                    label="Movement Type"
                                    onChange={(e) => {
                                        const movementType = e.target.value;
                                        updateStock(index, {
                                            movementType,
                                            destinationWarehouseId: movementType === 'TRANSFER'
                                                ? stock.destinationWarehouseId
                                                : undefined
                                        });
                                    }}
                                >
                                    <MenuItem value="IN">IN</MenuItem>
                                    <MenuItem value="OUT">OUT</MenuItem>
                                    <MenuItem value="RETURN">RETURN</MenuItem>
                                    <MenuItem value="DAMAGED">DAMAGED</MenuItem>
                                    <MenuItem value="TRANSFER">TRANSFER</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid size={{xs: 12, sm: 6}}>
                            <TextField
                                label="Quantity Change"
                                name="movementQuantity"
                                type="number"
                                value={stock.movementQuantity ?? ''}
                                onChange={(e) =>
                                    updateStock(index, {
                                        movementQuantity: Number(e.target.value)
                                    })
                                }
                                fullWidth
                            />
                        </Grid>

                        {stock.movementType === 'TRANSFER' && (
                            <Grid size={{xs: 12}}>
                                <FormControl fullWidth>
                                    <InputLabel id={`destinationWarehouse-label-${index}`}>Destination
                                        Warehouse</InputLabel>
                                    <Select
                                        labelId={`destinationWarehouse-label-${index}`}
                                        value={stock.destinationWarehouseId ? String(stock.destinationWarehouseId) : ''}
                                        label="Destination Warehouse"
                                        onChange={(e) =>
                                            updateStock(index, {
                                                destinationWarehouseId: Number(e.target.value)
                                            })
                                        }
                                    >
                                        {warehouses
                                            .filter(w => w.id !== stock.warehouse?.id)
                                            .map((warehouse) => (
                                                <MenuItem key={warehouse.id} value={warehouse.id}>
                                                    {warehouse.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        )}
                        {index < product.stocks.length - 1 && (
                            <Grid size={{xs: 12}}>
                                <Box sx={{ borderTop: '1px solid grey', marginTop: 2, marginBottom: 2 }} />
                            </Grid>
                        )}
                    </React.Fragment>
                ))
            )}

        </>
    );
};

export default ProductStock;
