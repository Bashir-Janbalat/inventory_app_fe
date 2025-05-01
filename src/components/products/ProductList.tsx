import React from 'react';
import {Container, Grid, Pagination, Stack} from '@mui/material';
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
        <Container>
            <Stack direction={{xs: 'column', sm: 'column', md: 'row'}}>
                <Grid container justifyContent="center" alignItems='center' spacing={4}>
                    {items.map((pro) => (
                        <Grid key={pro.id}
                              sx={{xs: 12, sm: 6, md: 4, lg: 4, justifyContent: 'center', alignItems: 'center'}}>
                            <ProductCard product={pro} onClick={() => handleProductClick(pro.id)}/>
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
        </Container>
    );
};

export default ProductList;
