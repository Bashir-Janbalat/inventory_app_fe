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
    TextField,
    Typography
} from '@mui/material';
import {CategoryDTO} from "../../types/CategoryDTO.ts";
import {BrandDTO} from "../../types/BrandDTO.ts";
import {SupplierDTO} from "../../types/SupplierDTO.ts";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";

export interface ProductFiltersProps {
    sortBy: 'name' | 'costPrice';
    sortDirection: 'asc' | 'desc';
    searchBy: string;
    categoryName: string;
    brandName: string;
    categories: CategoryDTO[];
    brands: BrandDTO[];
    supplierName: string;
    suppliers: SupplierDTO[];
    productStatus: string;
    setSortBy: (value: 'name' | 'costPrice') => void;
    setSortDirection: (value: 'asc' | 'desc') => void;
    setSearchBy: (value: string) => void;
    setCategoryName: (value: string) => void;
    setBrandName: (value: string) => void;
    setSupplierName: (value: string) => void;
    setProductStatus: (value: 'ACTIVE' | 'INACTIVE' | 'DELETED' | 'DISCONNECTED') => void;
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
                                                           supplierName,
                                                           suppliers,
                                                           productStatus,
                                                           setSortBy,
                                                           setSortDirection,
                                                           setSearchBy,
                                                           setCategoryName,
                                                           setBrandName,
                                                           setSupplierName,
                                                           setProductStatus,
                                                           setPage,
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
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{mb: 4}}>
                <Typography variant="h4" fontWeight="bold">Products</Typography>
                <Button
                    size="medium"
                    variant="contained"
                    startIcon={<AddIcon/>}
                    onClick={goToCreateProduct}
                >
                    Create
                </Button>
            </Stack>
            <Stack direction={{xs: 'column', sm: 'column', md: 'row'}} spacing={2} marginBottom={2}>
                <FormControl fullWidth>
                    <InputLabel id="sort-by-label">Sort By</InputLabel>
                    <Select
                        id="sort-by"
                        labelId="sort-by-label"
                        name="sort"
                        value={sortBy}
                        onChange={resetPageAndSetSelect(setSortBy)}
                    >
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="costPrice">Price</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="sort-direction-label">Direction</InputLabel>
                    <Select
                        labelId="sort-direction-label"
                        value={sortDirection}
                        label="Direction"
                        onChange={resetPageAndSetSelect(setSortDirection)}
                    >
                        <MenuItem value="asc">Asc ↑</MenuItem>
                        <MenuItem value="desc">Desc ↓</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="status-select-label">Status</InputLabel>
                    <Select
                        labelId="status-select-label"
                        id="status-select"
                        value={productStatus}
                        label="Status"
                        onChange={resetPageAndSetSelect(setProductStatus)}
                    >
                        <MenuItem value='ACTIVE'>ACTIVE</MenuItem>
                        <MenuItem value='INACTIVE'>INACTIVE</MenuItem>
                        <MenuItem value='DELETED'>DELETED</MenuItem>
                        <MenuItem value='DISCONNECTED'>DISCONNECTED</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="search-by-name"
                    name="search-by-name"
                    label="Search by name"
                    value={searchBy}
                    onChange={resetPageAndSetInput(setSearchBy)}
                    fullWidth
                />

                <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        id="category"
                        name="category"
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
                        name="brand"
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
                        name="supplier"
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
