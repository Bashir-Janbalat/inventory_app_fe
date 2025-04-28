import React from 'react';
import {
    Button, FormControl, InputLabel, MenuItem, Select,
    SelectChangeEvent, Stack, TextField
} from '@mui/material';
import { CategoryDTO } from "../../types/CategoryDTO.ts";
import { BrandDTO } from "../../types/BrandDTO.ts";
import { SupplierDTO } from "../../types/SupplierDTO.ts";
import AddIcon from "@mui/icons-material/Add";

export interface ProductFiltersProps {
    sortBy: 'name' | 'price';
    sortDirection: 'asc' | 'desc';
    searchBy: string;
    categoryName: string;
    brandName: string;
    categories: CategoryDTO[];
    brands: BrandDTO[];
    supplierName: string;
    suppliers: SupplierDTO[];
    setSortBy: (value: 'name' | 'price') => void;
    setSortDirection: (value: 'asc' | 'desc') => void;
    setSearchBy: (value: string) => void;
    setCategoryName: (value: string) => void;
    setBrandName: (value: string) => void;
    setSupplierName: (value: string) => void;
    setPage: (page: number) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
                                                           sortBy, sortDirection, searchBy, categoryName, brandName,
                                                           categories, brands, supplierName, suppliers,
                                                           setSortBy, setSortDirection, setSearchBy,
                                                           setCategoryName, setBrandName, setSupplierName, setPage,
                                                       }) => {

    const resetPageAndSetSelect = <T extends string>(setter: (value: T) => void) => (e: SelectChangeEvent) => {
        setter(e.target.value as T);
        setPage(1);
    };

    const resetPageAndSetInput = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
        setPage(1);
    };

    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{
                mb: 3,
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                sx={{
                    py: 1,
                    px: 3,
                    fontSize: '16px',
                    height: '50px',
                    flexShrink: 0,
                }}
            >
                Create
            </Button>

            <Stack
                direction="row"
                spacing={2}
                sx={{
                    flexGrow: 1,
                    flexWrap: 'wrap',
                    justifyContent: 'flex-end',
                }}
            >
                <FormControl sx={{ minWidth: 120, flexGrow: 1, maxWidth: 180 }}>
                    <InputLabel>Sort by</InputLabel>
                    <Select
                        value={sortBy}
                        label="Sort by"
                        onChange={resetPageAndSetSelect(setSortBy)}
                    >
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="price">Price</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 120, flexGrow: 1, maxWidth: 180 }}>
                    <InputLabel>Direction</InputLabel>
                    <Select
                        value={sortDirection}
                        label="Direction"
                        onChange={resetPageAndSetSelect(setSortDirection)}
                    >
                        <MenuItem value="asc">Ascending ↑</MenuItem>
                        <MenuItem value="desc">Descending ↓</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="Search by name"
                    value={searchBy}
                    onChange={resetPageAndSetInput(setSearchBy)}
                    sx={{ minWidth: 200, flexGrow: 1, maxWidth: 250 }}
                />

                <FormControl sx={{ minWidth: 120, flexGrow: 1, maxWidth: 180 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={categoryName}
                        label="Category"
                        onChange={resetPageAndSetSelect(setCategoryName)}
                    >
                        <MenuItem value="">All</MenuItem>
                        {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.name}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 120, flexGrow: 1, maxWidth: 180 }}>
                    <InputLabel>Brand</InputLabel>
                    <Select
                        value={brandName}
                        label="Brand"
                        onChange={resetPageAndSetSelect(setBrandName)}
                    >
                        <MenuItem value="">All</MenuItem>
                        {brands.map((b) => (
                            <MenuItem key={b.id} value={b.name}>
                                {b.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 120, flexGrow: 1, maxWidth: 180 }}>
                    <InputLabel>Supplier</InputLabel>
                    <Select
                        value={supplierName}
                        label="Supplier"
                        onChange={resetPageAndSetSelect(setSupplierName)}
                    >
                        <MenuItem value="">All</MenuItem>
                        {suppliers.map((s) => (
                            <MenuItem key={s.id} value={s.name}>
                                {s.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
        </Stack>
    );
};

export default ProductFilters;
