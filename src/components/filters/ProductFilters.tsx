import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField} from '@mui/material';
import {CategoryDTO} from "../../types/CategoryDTO.ts";
import {BrandDTO} from "../../types/BrandDTO.ts";


export interface ProductFiltersProps {
    sortBy: 'name' | 'price';
    sortDirection: 'asc' | 'desc';
    searchBy: string;
    categoryName: string;
    brandName: string;
    categories: CategoryDTO[];
    brands: BrandDTO[];
    setSortBy: (value: 'name' | 'price') => void;
    setSortDirection: (value: 'asc' | 'desc') => void;
    setSearchBy: (value: string) => void;
    setCategoryName: (value: string) => void;
    setBrandName: (value: string) => void;
    setPage: (page: number) => void;
}


const ProductFilters: React.FC<ProductFiltersProps> = ({
                                                           sortBy,
                                                           sortDirection,
                                                           searchBy,
                                                           categoryName,
                                                           brandName,
                                                           categories,
                                                           brands,
                                                           setSortBy,
                                                           setSortDirection,
                                                           setSearchBy,
                                                           setCategoryName,
                                                           setBrandName,
                                                           setPage,
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
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>

            <FormControl sx={{ minWidth: 120 }}>
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

            <FormControl sx={{ minWidth: 120 }}>
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

            <FormControl sx={{ minWidth: 200 }}>
                <TextField
                    label="Search by name"
                    value={searchBy}
                    onChange={resetPageAndSetInput(setSearchBy)}
                    fullWidth
                />
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
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

            <FormControl sx={{ minWidth: 120 }}>
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

        </Stack>
    );
};

export default ProductFilters;
