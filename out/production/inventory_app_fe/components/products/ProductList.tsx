import React from 'react';
import {Grid, Pagination, Stack} from '@mui/material';
import {ProductDTO} from "../../types/ProductDTO.ts";
import {useNavigate} from "react-router-dom";
import ProductCard from "./ProductCard.tsx";
import {CustomGridProps} from "../../types/CustomGridProps.ts";


const ProductList: React.FC<CustomGridProps<ProductDTO>> = ({
                                                                items,
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
            <Stack>
                <Grid container >
                    {items.map((pro) => (
                        <Grid key={pro.id}
                              size={{xs: 12, sm: 6, md: 4, lg: 4}}>
                            <ProductCard product={pro} onClick={() => handleProductClick(pro.id as number)}/>
                        </Grid>
                    ))}
                </Grid>

            </Stack>
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
