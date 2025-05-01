import React from 'react';
import {BrandDTO} from "../../types/BrandDTO.ts";
import {Button, Card, CardContent, Container, Grid, Pagination, Stack, Typography} from '@mui/material';
import {CustomGridProps} from "../../types/CustomGridProps.ts";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";


const BrandList: React.FC<CustomGridProps<BrandDTO>> = ({items, totalPages, setPage, page}) => {
    const navigate = useNavigate();

    const goToCreateBrand = () => {
        navigate('/createBrand');
    }

    return (
        <Container>
            <Typography variant="h4" sx={{mb: 4, fontWeight: 'bold'}}>
                Brands
            </Typography>
            <Button fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon/>}
                    style={{minHeight: 50}}
                    onClick={goToCreateBrand}
            >
                Create
            </Button>
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
