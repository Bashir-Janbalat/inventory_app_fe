import React from 'react';
import {Grid, Pagination, Stack} from '@mui/material';
import ProductCard from './ProductCard';
import {ProductDTO} from "../types/ProductDTO.ts";
import {useNavigate} from "react-router-dom";


interface ProductsGridProps {
    products: ProductDTO[];
    totalPages: number;
    page: number;
    setPage: (value: number) => void;
}

const ProductList: React.FC<ProductsGridProps> = ({
                                                      products,
                                                      totalPages,
                                                      page,
                                                      setPage,
                                                  }) => {
    const navigate = useNavigate();

    const handleProductClick = (id: number) => {
        navigate(`/products/${id}`);
    };

    return (
        <>
            <Grid container spacing={4} style={{minHeight: '400px'}}>
                {products.map((pro) => (
                    <Grid size={{xs: 12, sm: 6, md: 4}} key={pro.id}>
                        <ProductCard product={pro} onClick={() => handleProductClick(pro.id)}/>
                    </Grid>
                ))}
            </Grid>

            <Stack direction="row" justifyContent="center" alignItems="center" marginTop={4}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_event, value) => setPage(value)}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </Stack>
        </>
    );
};

export default ProductList;
