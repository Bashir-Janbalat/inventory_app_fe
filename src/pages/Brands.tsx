import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { BrandDTO } from '../types/BrandDTO';
import { getBrands } from '../api/BrandApi.ts';

const Brands: React.FC = () => {
    const [brands, setBrands] = useState<BrandDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const data = await getBrands();
                setBrands(data.content);
            } catch (error) {
                console.error('Error fetching brands:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    if (loading) {
        return (
            <Container sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4,pt: { xs: '80px', sm: '80px' } }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                Brands
            </Typography>
            <Grid container spacing={3}>
                {brands.map((brand) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={brand.id}>
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

export default Brands;
