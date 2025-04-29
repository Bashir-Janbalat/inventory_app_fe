import React from 'react';
import {BrandDTO} from "../../types/BrandDTO.ts";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent
} from '@mui/material';

type BrandListProps = {
    brands: BrandDTO[];
};

const BrandList: React.FC<BrandListProps> = ({brands}) => {
    return (
        <Container>
            <Typography variant="h4" sx={{mb: 4, fontWeight: 'bold'}}>
                Brands
            </Typography>
            <Grid container spacing={3}>
                {brands.map((brand) => (
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
        </Container>
    );
};

export default BrandList;
