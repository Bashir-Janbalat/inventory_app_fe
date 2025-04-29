import React from 'react';
import {CategoryDTO} from '../../types/CategoryDTO.ts';
import {Card, CardContent, Container, Grid, Typography} from '@mui/material';

type CategoryListProps = {
    categories: CategoryDTO[];
};

const CategoryList: React.FC<CategoryListProps> = ({categories}) => {
    return (
        <Container>
            <Typography variant="h4" sx={{mb: 4, fontWeight: 'bold'}}>
                Categories
            </Typography>
            <Grid container spacing={3}>
                {categories.map((category) => (
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
        </Container>
    );
};

export default CategoryList;
