import React from 'react';
import {
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField
} from '@mui/material';
import {CategoryDTO} from "../../types/CategoryDTO.ts";
import {BrandDTO} from "../../types/BrandDTO.ts";
import {SupplierDTO} from "../../types/SupplierDTO.ts";
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
        <Container >
            <Stack spacing={2} marginBottom={3}>
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{xs: 12, sm: "auto"}}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon/>}
                            fullWidth
                            style={{minHeight: 50}}
                        >
                            Create
                        </Button>
                    </Grid>

                    <Grid size={{xs: 12, sm: "auto"}}>
                        <Grid container spacing={2}>
                            <Grid size={{xs: 12, sm: 6, md: 4, lg: 2}}>
                                <FormControl fullWidth>
                                    <InputLabel>Sort by</InputLabel>
                                    <Select
                                        value={sortBy}
                                        label="Sort by"
                                        onChange={(e) => resetPageAndSetSelect(setSortBy)(e)}
                                    >
                                        <MenuItem value="name">Name</MenuItem>
                                        <MenuItem value="price">Price</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid size={{xs: 12, sm: 6, md: 4, lg: 2}}>
                                <FormControl fullWidth>
                                    <InputLabel>Direction </InputLabel>
                                    <Select
                                        value={sortDirection}
                                        label="Direction"
                                        onChange={(e) => resetPageAndSetSelect(setSortDirection)(e)}
                                    >
                                        <MenuItem value="asc">Ascending ↑</MenuItem>
                                        <MenuItem value="desc">Descending ↓</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid size={{xs: 12, sm: 6, md: 4, lg: 2}}>
                                <TextField
                                    fullWidth
                                    label="Search by name"
                                    value={searchBy}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        resetPageAndSetInput(setSearchBy)(e)
                                    }
                                />
                            </Grid>

                            <Grid size={{xs: 12, sm: 6, md: 4, lg: 2}}>
                                <FormControl fullWidth>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        value={categoryName}
                                        label="Category"
                                        onChange={(e) => resetPageAndSetSelect(setCategoryName)(e)}
                                    >
                                        <MenuItem value="">All</MenuItem>
                                        {categories.map((cat) => (
                                            <MenuItem key={cat.id} value={cat.name}>
                                                {cat.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid size={{xs: 12, sm: 6, md: 4, lg: 2}}>
                                <FormControl fullWidth>
                                    <InputLabel>Brand</InputLabel>
                                    <Select
                                        value={brandName}
                                        label="Brand"
                                        onChange={(e) => resetPageAndSetSelect(setBrandName)(e)}
                                    >
                                        <MenuItem value="">All</MenuItem>
                                        {brands.map((b) => (
                                            <MenuItem key={b.id} value={b.name}>
                                                {b.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid size={{xs: 12, sm: 6, md: 4, lg: 2}}>
                                <FormControl fullWidth>
                                    <InputLabel>Supplier</InputLabel>
                                    <Select
                                        value={supplierName}
                                        label="Supplier"
                                        onChange={(e) => resetPageAndSetSelect(setSupplierName)(e)}
                                    >
                                        <MenuItem value="">All</MenuItem>
                                        {suppliers.map((s) => (
                                            <MenuItem key={s.id} value={s.name}>
                                                {s.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
};

export default ProductFilters;
