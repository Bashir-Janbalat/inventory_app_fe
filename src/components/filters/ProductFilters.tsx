import React from 'react';
import {
    Button,
    Container,
    FormControl,
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
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();

    const resetPageAndSetSelect = <T extends string>(setter: (value: T) => void) => (e: SelectChangeEvent) => {
        setter(e.target.value as T);
        setPage(1);
    };

    const resetPageAndSetInput = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
        setPage(1);
    };

    const goToCreateProduct = () => {
        navigate('/createProduct');
    };

    return (
        <Container>
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={2} marginBottom={2}>

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    style={{ minHeight: 50 }}
                    onClick={goToCreateProduct}
                >
                    Create
                </Button>

                <FormControl fullWidth>
                    <InputLabel id="sort-by-label">Sort by</InputLabel>
                    <Select
                        id="sort-by"
                        labelId="sort-by-label"
                        value={sortBy}
                        label="Sort by"
                        onChange={resetPageAndSetSelect(setSortBy)}
                    >
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="sellingPrice">Price</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="sort-direction-label">Direction</InputLabel>
                    <Select
                        id="sort-direction"
                        labelId="sort-direction-label"
                        value={sortDirection}
                        label="Direction"
                        onChange={resetPageAndSetSelect(setSortDirection)}
                    >
                        <MenuItem value="asc">Asc ↑</MenuItem>
                        <MenuItem value="desc">Desc ↓</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    id="search-by-name"
                    label="Search by name"
                    value={searchBy}
                    onChange={resetPageAndSetInput(setSearchBy)}
                    fullWidth
                />

                <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        id="category"
                        labelId="category-label"
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

                <FormControl fullWidth>
                    <InputLabel id="brand-label">Brand</InputLabel>
                    <Select
                        id="brand"
                        labelId="brand-label"
                        value={brandName}
                        label="Brand"
                        onChange={resetPageAndSetSelect(setBrandName)}
                    >
                        <MenuItem value="">All</MenuItem>
                        {brands.map((brand) => (
                            <MenuItem key={brand.id} value={brand.name}>
                                {brand.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="supplier-label">Supplier</InputLabel>
                    <Select
                        id="supplier"
                        labelId="supplier-label"
                        value={supplierName}
                        label="Supplier"
                        onChange={resetPageAndSetSelect(setSupplierName)}
                    >
                        <MenuItem value="">All</MenuItem>
                        {suppliers.map((supplier) => (
                            <MenuItem key={supplier.id} value={supplier.name}>
                                {supplier.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </Stack>
        </Container>
    );
};

export default ProductFilters;
