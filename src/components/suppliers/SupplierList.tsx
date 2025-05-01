import React from 'react';
import {SupplierDTO} from '../../types/SupplierDTO.ts';
import {Card, CardContent, Container, Grid, Pagination, Stack, Typography} from '@mui/material';
import {CustomGridProps} from "../../types/CustomGridProps.ts";


const SupplierList: React.FC<CustomGridProps<SupplierDTO>> = ({items, page, setPage, totalPages}) => {
    return (
        <Container>
            <Typography variant="h4" sx={{mb: 4, fontWeight: 'bold'}}>
                Suppliers
            </Typography>
            <Grid container spacing={3}>
                {items.map((supplier) => (
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

export default SupplierList;
