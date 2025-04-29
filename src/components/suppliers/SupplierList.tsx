import React from 'react';
import {SupplierDTO} from '../../types/SupplierDTO.ts';
import {Card, CardContent, Container, Grid, Typography} from '@mui/material';

type SupplierListProps = {
    suppliers: SupplierDTO[];
};

const SupplierList: React.FC<SupplierListProps> = ({suppliers}) => {
    return (
        <Container>
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

export default SupplierList;
