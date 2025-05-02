import React from 'react';
import {CategoryDTO} from '../../types/CategoryDTO.ts';
import {Button, Card, CardContent, Container, Grid, Pagination, Stack, Typography} from '@mui/material';
import {CustomGridProps} from "../../types/CustomGridProps.ts";
import AddIcon from "@mui/icons-material/Add";


const CategoryList: React.FC<CustomGridProps<CategoryDTO>> = ({items, page, setPage, totalPages}) => {

    function goToCreateCategory() {

    }

    return (
        <Container>
            <Typography variant="h4" sx={{mb: 4, fontWeight: 'bold'}}>
                Categories
            </Typography>
            <Grid container spacing={3}>
                <Button fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon/>}
                        style={{minHeight: 50}}
                        onClick={goToCreateCategory}
                >
                    Create
                </Button>

                {items.map((category) => (
                    <Grid size={{xs: 12, sm: 6, md: 4}} key={category.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {category.name}
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

export default CategoryList;
