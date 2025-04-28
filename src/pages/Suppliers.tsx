import React, {useEffect, useState} from 'react';
import {Card, CardContent, CircularProgress, Container, Grid, Typography} from '@mui/material';
import {SupplierDTO} from '../types/SupplierDTO';
import {getSuppliers} from '../api/SupplierApi.ts';

const Suppliers: React.FC = () => {
    const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const data = await getSuppliers();
                setSuppliers(data.content);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    if (loading) {
        return (
            <Container sx={{textAlign: 'center', py: 4}}>
                <CircularProgress/>
            </Container>
        );
    }

    return (
        <Container sx={{py: 4, pt: {xs: '80px', sm: '80px'}}}>
            <Typography variant="h4" sx={{mb: 4, fontWeight: 'bold'}}>
                Suppliers
            </Typography>
            <Grid container spacing={3}>
                {suppliers.map((supplier) => (
                    <Grid size={{xs: 12, sm: 6, md: 4}} key={supplier.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {supplier.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {supplier.contactEmail || 'No contact information.'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Suppliers;
