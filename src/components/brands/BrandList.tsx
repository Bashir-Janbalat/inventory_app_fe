import React from 'react';
import {BrandDTO} from "../../types/BrandDTO.ts";
import {Card, CardContent, Container, Grid, Pagination, Stack, Typography} from '@mui/material';
import {CustomGridProps} from "../../types/CustomGridProps.ts";


const BrandList: React.FC<CustomGridProps<BrandDTO>> = ({items, totalPages, setPage, page}) => {
    return (
        <Container>
            <Typography variant="h4" sx={{mb: 4, fontWeight: 'bold'}}>
                Brands
            </Typography>
            <Grid container spacing={3}>
                {items.map((brand) => (
                    <Grid size={{xs: 12, sm: 6, md: 4}} key={brand.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {brand.name}
                                </Typography>
                            </CardContent>
                        </Card>
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
        </Container>
    );
};

export default BrandList;
